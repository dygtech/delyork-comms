import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environmental variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const WP_API = 'https://delyorkcommunications.com/?rest_route=/wp/v2';
const STRAPI_API = 'http://127.0.0.1:1337/api';
const STRAPI_UPLOAD_API = 'http://127.0.0.1:1337/api/upload';

// Optional API token from environment, otherwise fallback to public endpoints
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
};
if (process.env.STRAPI_API_TOKEN) {
  headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
}

// Configuration
const DRY_RUN = false; // Set to true to test migration without writing to Strapi
const TEST_LIMIT = 5;  // Limit the number of posts to migrate during testing (set to 0 for unlimited)

async function runMigration() {
  console.log('=== STARTING WORDPRESS TO STRAPI MIGRATION ===');
  if (DRY_RUN) console.log('⚠️ RUNNING IN DRY RUN MODE (No records will be created in Strapi)');

  try {
    // 1. Migrate Categories
    console.log('\n--- Step 1: Migrating Categories ---');
    const categoryMap = await migrateCategories();
    console.log(`Successfully mapped ${categoryMap.size} categories.`);

    // 2. Migrate Posts
    console.log('\n--- Step 2: Migrating Posts ---');
    const postMap = await migratePosts(categoryMap);
    console.log(`Successfully mapped ${postMap.size} posts.`);

    // 3. Migrate Comments
    console.log('\n--- Step 3: Migrating Comments ---');
    await migrateComments(postMap);

    console.log('\n=== MIGRATION COMPLETE ===');
  } catch (error) {
    console.error('Migration failed with critical error:', error);
  }
}

/**
 * Fetch and migrate WordPress Categories
 */
async function migrateCategories(): Promise<Map<number, number>> {
  const categoryMap = new Map<number, number>();
  
  console.log('Fetching categories from WordPress...');
  const wpRes = await fetch(`${WP_API}/categories&per_page=100`);
  if (!wpRes.ok) throw new Error(`Failed to fetch WP categories: ${wpRes.statusText}`);
  const wpCategories = await wpRes.json() as any[];

  console.log(`Found ${wpCategories.length} categories on WordPress.`);

  for (const wpCat of wpCategories) {
    console.log(`Processing category: "${wpCat.name}" (WP ID: ${wpCat.id})`);
    
    // Check if category already exists in Strapi by wp_id
    const checkRes = await fetch(`${STRAPI_API}/categories?filters[wp_id][$eq]=${wpCat.id}`, { headers });
    if (!checkRes.ok) {
      console.warn(`Could not verify if category exists in Strapi: ${checkRes.statusText}`);
      continue;
    }
    const checkJson = await checkRes.json() as any;
    
    let strapiId: number;
    
    if (checkJson.data && checkJson.data.length > 0) {
      strapiId = checkJson.data[0].id;
      console.log(`Category "${wpCat.name}" already exists in Strapi (ID: ${strapiId}). Skipping creation.`);
    } else {
      if (DRY_RUN) {
        strapiId = Math.floor(Math.random() * 1000);
      } else {
        const createRes = await fetch(`${STRAPI_API}/categories`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            data: {
              name: wpCat.name,
              slug: wpCat.slug,
              wp_id: wpCat.id,
              publishedAt: new Date().toISOString() // auto-publish
            }
          })
        });

        if (!createRes.ok) {
          console.error(`Failed to create category "${wpCat.name}":`, await createRes.text());
          continue;
        }

        const createJson = await createRes.json() as any;
        strapiId = createJson.data.id;
        console.log(`Created Category "${wpCat.name}" in Strapi (ID: ${strapiId}).`);
      }
    }
    
    categoryMap.set(wpCat.id, strapiId);
  }

  return categoryMap;
}

/**
 * Fetch and migrate WordPress Posts
 */
async function migratePosts(categoryMap: Map<number, number>): Promise<Map<number, number>> {
  const postMap = new Map<number, number>();
  
  // Setup pagination or testing limit
  const perPage = TEST_LIMIT > 0 ? Math.min(TEST_LIMIT, 50) : 50;
  let page = 1;
  let postsFetched = 0;
  let hasMore = true;

  while (hasMore) {
    console.log(`Fetching posts page ${page}...`);
    const wpRes = await fetch(`${WP_API}/posts&per_page=${perPage}&page=${page}`);
    if (!wpRes.ok) {
      if (wpRes.status === 400) {
        // Out of pages
        break;
      }
      throw new Error(`Failed to fetch WP posts: ${wpRes.statusText}`);
    }
    
    const wpPosts = await wpRes.json() as any[];
    if (wpPosts.length === 0) break;

    console.log(`Fetched ${wpPosts.length} posts from page ${page}.`);

    for (const wpPost of wpPosts) {
      if (TEST_LIMIT > 0 && postsFetched >= TEST_LIMIT) {
        console.log(`Reached test limit of ${TEST_LIMIT} posts. Stopping.`);
        hasMore = false;
        break;
      }

      console.log(`\nProcessing post: "${wpPost.title.rendered}" (WP ID: ${wpPost.id})`);
      postsFetched++;

      // Check if post already exists in Strapi by wp_id
      const checkRes = await fetch(`${STRAPI_API}/posts?filters[wp_id][$eq]=${wpPost.id}`, { headers });
      if (!checkRes.ok) {
        console.warn(`Could not verify if post exists in Strapi: ${checkRes.statusText}`);
        continue;
      }
      const checkJson = await checkRes.json() as any;
      
      let strapiPostId: number;

      if (checkJson.data && checkJson.data.length > 0) {
        strapiPostId = checkJson.data[0].id;
        console.log(`Post already exists in Strapi (ID: ${strapiPostId}). Skipping creation.`);
      } else {
        // Resolve cover image (featured_media)
        let featuredImageId: number | null = null;
        if (wpPost.featured_media > 0) {
          console.log(`Post has featured media (WP ID: ${wpPost.featured_media}). Resolving image...`);
          featuredImageId = await downloadAndUploadMedia(wpPost.featured_media);
        }

        // Resolve categories mapped to Strapi IDs
        const strapiCategoryIds = (wpPost.categories || [])
          .map((wpCatId: number) => categoryMap.get(wpCatId))
          .filter((id: number | undefined): id is number => id !== undefined);

        if (DRY_RUN) {
          strapiPostId = Math.floor(Math.random() * 1000);
          console.log(`[DRY RUN] Would create post with categories: ${JSON.stringify(strapiCategoryIds)}, cover image: ${featuredImageId}`);
        } else {
          const createRes = await fetch(`${STRAPI_API}/posts`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              data: {
                title: wpPost.title.rendered,
                slug: wpPost.slug,
                content: wpPost.content.rendered,
                excerpt: wpPost.excerpt.rendered,
                wp_id: wpPost.id,
                publishedAt: wpPost.date || new Date().toISOString(), // Use original WP publication date
                featured_image: featuredImageId,
                categories: strapiCategoryIds
              }
            })
          });

          if (!createRes.ok) {
            console.error(`Failed to create post:`, await createRes.text());
            continue;
          }

          const createJson = await createRes.json() as any;
          strapiPostId = createJson.data.id;
          console.log(`Created Post in Strapi (ID: ${strapiPostId}).`);
        }
      }

      postMap.set(wpPost.id, strapiPostId);
    }

    if (TEST_LIMIT > 0 && postsFetched >= TEST_LIMIT) {
      break;
    }
    
    page++;
  }

  return postMap;
}

/**
 * Fetch and migrate WordPress Comments
 */
async function migrateComments(postMap: Map<number, number>) {
  console.log('Fetching comments from WordPress...');
  const wpRes = await fetch(`${WP_API}/comments&per_page=100`);
  if (!wpRes.ok) {
    console.warn(`Failed to fetch WP comments: ${wpRes.statusText}. Comments migration skipped.`);
    return;
  }
  const wpComments = await wpRes.json() as any[];

  console.log(`Found ${wpComments.length} comments on WordPress.`);

  for (const wpComment of wpComments) {
    console.log(`Processing comment by "${wpComment.author_name}" on WP Post ID: ${wpComment.post}`);
    
    // Locate target Strapi Post ID
    let strapiPostId = postMap.get(wpComment.post);
    
    // If not found in memory (e.g. because post was already migrated in a previous run), query Strapi
    if (!strapiPostId) {
      const postCheck = await fetch(`${STRAPI_API}/posts?filters[wp_id][$eq]=${wpComment.post}`, { headers });
      if (postCheck.ok) {
        const postCheckJson = await postCheck.json() as any;
        if (postCheckJson.data && postCheckJson.data.length > 0) {
          strapiPostId = postCheckJson.data[0].id;
        }
      }
    }

    if (!strapiPostId) {
      console.log(`Target post with WP ID ${wpComment.post} does not exist in Strapi yet. Skipping comment.`);
      continue;
    }

    // Check if comment already exists in Strapi by wp_id
    const checkRes = await fetch(`${STRAPI_API}/comments?filters[wp_id][$eq]=${wpComment.id}`, { headers });
    if (!checkRes.ok) {
      console.warn(`Could not verify if comment exists: ${checkRes.statusText}`);
      continue;
    }
    const checkJson = await checkRes.json() as any;

    if (checkJson.data && checkJson.data.length > 0) {
      console.log(`Comment already exists in Strapi (ID: ${checkJson.data[0].id}). Skipping.`);
    } else {
      if (DRY_RUN) {
        console.log(`[DRY RUN] Would create comment for Strapi Post ID: ${strapiPostId}`);
      } else {
        const createRes = await fetch(`${STRAPI_API}/comments`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            data: {
              author_name: wpComment.author_name,
              author_email: wpComment.author_email || 'anonymous@example.com',
              content: wpComment.content.rendered,
              wp_id: wpComment.id,
              post: strapiPostId,
              publishedAt: wpComment.date || new Date().toISOString()
            }
          })
        });

        if (!createRes.ok) {
          console.error(`Failed to create comment:`, await createRes.text());
          continue;
        }

        const createJson = await createRes.json() as any;
        console.log(`Created Comment in Strapi (ID: ${createJson.data.id}) on Post ${strapiPostId}.`);
      }
    }
  }
}

/**
 * Downloads a WordPress media item and uploads it to Strapi
 */
async function downloadAndUploadMedia(wpMediaId: number): Promise<number | null> {
  try {
    // 1. Fetch WP media details to get high-res source URL
    const mediaRes = await fetch(`${WP_API}/media/${wpMediaId}`);
    if (!mediaRes.ok) {
      console.warn(`Could not fetch WP media info for ID ${wpMediaId}: ${mediaRes.statusText}`);
      return null;
    }
    const mediaInfo = await mediaRes.ok ? await mediaRes.json() as any : null;
    if (!mediaInfo || !mediaInfo.source_url) {
      console.warn(`No source URL found for WP media ID ${wpMediaId}`);
      return null;
    }

    const imageUrl = mediaInfo.source_url;
    const filename = path.basename(imageUrl.split('?')[0]);
    console.log(`Downloading image from: ${imageUrl}...`);

    // 2. Fetch/Download the actual image binary
    const imageFetch = await fetch(imageUrl);
    if (!imageFetch.ok) {
      console.warn(`Failed to download image from ${imageUrl}: ${imageFetch.statusText}`);
      return null;
    }

    const arrayBuffer = await imageFetch.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    // 3. Construct multipart FormData for Strapi's upload endpoint
    const formData = new FormData();
    formData.append('files', blob, filename);

    if (DRY_RUN) {
      console.log(`[DRY RUN] Would upload file: "${filename}" to Strapi.`);
      return Math.floor(Math.random() * 100);
    }

    // Prepare auth header for upload
    const uploadHeaders: Record<string, string> = {};
    if (process.env.STRAPI_API_TOKEN) {
      uploadHeaders['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
    }

    // 4. Post to Strapi upload endpoint
    const uploadRes = await fetch(STRAPI_UPLOAD_API, {
      method: 'POST',
      headers: uploadHeaders,
      body: formData
    });

    if (!uploadRes.ok) {
      console.error(`Failed to upload media to Strapi:`, await uploadRes.text());
      return null;
    }

    const uploadedFiles = await uploadRes.json() as any[];
    if (uploadedFiles && uploadedFiles.length > 0) {
      const strapiMediaId = uploadedFiles[0].id;
      console.log(`Successfully uploaded image "${filename}" to Strapi (ID: ${strapiMediaId}).`);
      return strapiMediaId;
    }
  } catch (error) {
    console.error(`Error processing media ID ${wpMediaId}:`, error);
  }
  
  return null;
}

runMigration();
