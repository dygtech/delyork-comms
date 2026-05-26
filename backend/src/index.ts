import type { Core } from '@strapi/strapi';
import * as path from 'path';

/**
 * Resilient HTTP fetch utility with exponential backoff retries for WordPress endpoints
 */
async function fetchWithRetry(url: string, retries = 5, delay = 2000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      console.log(`  ⚠ Request to ${url} failed with status ${res.status}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
    } catch (e: any) {
      console.log(`  ⚠ Connection to ${url} failed: ${e.message || e}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return fetch(url); // Final attempt (let it throw error if it still fails)
}

async function runMigration(strapi: Core.Strapi) {
  console.log('\n======================================================');
  console.log('🚀 WP-TO-STRAPI INTERNAL MIGRATION STARTED');
  console.log('======================================================');

  const WP_API = 'https://delyorkcommunications.com/?rest_route=/wp/v2';

  try {
    // 1. Categories Migration
    console.log('\n📂 [STEP 1] Migrating Categories...');
    const categoryMap = new Map<number, any>();
    const catRes = await fetchWithRetry(`${WP_API}/categories&per_page=100`);
    if (!catRes.ok) throw new Error(`Failed to fetch WordPress categories: ${catRes.statusText}`);
    const wpCategories = (await catRes.json()) as any[];

    console.log(`Fetched ${wpCategories.length} categories from WordPress.`);

    for (const wpCat of wpCategories) {
      // Query Strapi for existing category by wp_id
      const existing = await strapi.documents('api::category.category').findMany({
        filters: { wp_id: wpCat.id },
      });

      let strapiId: any;

      if (existing && existing.length > 0) {
        strapiId = existing[0].id;
        console.log(`✔ Category "${wpCat.name}" already exists (Strapi ID: ${strapiId}).`);
      } else {
        const created = await strapi.documents('api::category.category').create({
          data: {
            name: wpCat.name,
            slug: wpCat.slug,
            wp_id: wpCat.id,
          },
          status: 'published',
        });
        strapiId = created.id;
        console.log(`➕ Created Category: "${wpCat.name}" (Strapi ID: ${strapiId}).`);
      }
      categoryMap.set(wpCat.id, strapiId);
    }

    // 2. Posts Migration (Page 1 - High Fidelity Blog Import)
    console.log('\n📝 [STEP 2] Migrating Posts...');

    // Wipe comments and posts tables first to guarantee clean re-seeding and reflect actual WP dates
    console.log('\n🧹 Wiping old comments and posts to prevent duplicate seeding and align dates for SEO...');
    
    // Wipe comments
    const allComments = await strapi.documents('api::comment.comment').findMany({ limit: 1000 });
    if (allComments && allComments.length > 0) {
      console.log(`  🔍 Found ${allComments.length} existing comments. Deleting...`);
      for (const comment of allComments) {
        await strapi.documents('api::comment.comment').delete({ documentId: comment.documentId });
      }
      console.log(`  ✔ Deleted existing comments.`);
    } else {
      console.log(`  ✔ No existing comments found.`);
    }

    // Wipe posts
    const allPosts = await strapi.documents('api::post.post').findMany({ limit: 1000 });
    if (allPosts && allPosts.length > 0) {
      console.log(`  🔍 Found ${allPosts.length} existing posts. Deleting...`);
      for (const post of allPosts) {
        await strapi.documents('api::post.post').delete({ documentId: post.documentId });
      }
      console.log(`  ✔ Deleted existing posts.`);
    } else {
      console.log(`  ✔ No existing posts found.`);
    }

    const postMap = new Map<number, any>();
    
    // Fetch ALL posts with pagination
    let page = 1;
    let allWpPosts: any[] = [];
    const perPage = 50; // Max per page for WP REST API

    while (true) {
      console.log(`  📄 Fetching posts page ${page}...`);
      const postsRes = await fetchWithRetry(`${WP_API}/posts&per_page=${perPage}&page=${page}`);
      
      if (!postsRes.ok) {
        // WP returns 400 when page exceeds total pages
        if (postsRes.status === 400) {
          console.log(`  ✔ No more pages (stopped at page ${page}).`);
          break;
        }
        throw new Error(`Failed to fetch WordPress posts page ${page}: ${postsRes.statusText}`);
      }
      
      const pagePosts = (await postsRes.json()) as any[];
      if (pagePosts.length === 0) break;
      
      allWpPosts = allWpPosts.concat(pagePosts);
      console.log(`  ✔ Page ${page}: fetched ${pagePosts.length} posts (total so far: ${allWpPosts.length}).`);
      
      // Check X-WP-TotalPages header to know if there are more pages
      const totalPages = parseInt(postsRes.headers.get('X-WP-TotalPages') || '1', 10);
      if (page >= totalPages) break;
      
      page++;
    }

    console.log(`Fetched ${allWpPosts.length} total posts from WordPress to process.`);

    for (const wpPost of allWpPosts) {
      console.log(`\n• Processing post: "${wpPost.title.rendered}" (WP ID: ${wpPost.id})`);

      // Check if post already exists
      const existingPost = await strapi.documents('api::post.post').findMany({
        filters: { wp_id: wpPost.id },
      });

      let strapiPostId: any;

      if (existingPost && existingPost.length > 0) {
        strapiPostId = existingPost[0].id;
        console.log(`  ✔ Post already exists (Strapi ID: ${strapiPostId}).`);
      } else {
        // Resolve featured cover image
        let featuredImageId: number | null = null;
        if (wpPost.featured_media > 0) {
          try {
            console.log(`  🔍 Fetching media details (WP Media ID: ${wpPost.featured_media})...`);
            const mediaRes = await fetchWithRetry(`${WP_API}/media/${wpPost.featured_media}`);
            if (mediaRes.ok) {
              const mediaInfo = (await mediaRes.json()) as any;
              if (mediaInfo && mediaInfo.source_url) {
                const imageUrl = mediaInfo.source_url;
                const filename = path.basename(imageUrl.split('?')[0]) || 'featured.jpg';

                console.log(`  📥 Downloading image binary: ${imageUrl}`);
                const imgFetch = await fetchWithRetry(imageUrl);
                if (imgFetch.ok) {
                  const arrayBuffer = await imgFetch.arrayBuffer();

                  console.log(`  📥 Saving cover image temporarily: "${filename}"`);
                  const fs = require('fs');
                  const tempDir = path.join(__dirname, '../../tmp');
                  if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir, { recursive: true });
                  }
                  const tempFilePath = path.join(tempDir, filename);
                  fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer));

                  console.log(`  📤 Uploading cover image to Media Library: "${filename}"`);
                  const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
                    data: {},
                    files: {
                      originalFilename: filename,
                      mimetype: 'image/jpeg',
                      size: arrayBuffer.byteLength,
                      filepath: tempFilePath,
                    },
                  });

                  // Clean up local temp file
                  if (fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath);
                  }

                  if (uploadedFiles && uploadedFiles.length > 0) {
                    featuredImageId = uploadedFiles[0].id;
                    console.log(`  ✔ Uploaded image successfully (Strapi Media ID: ${featuredImageId}).`);
                  }
                }
              }
            }
          } catch (e) {
            console.error(`  ⚠ Failed to process cover image for WP post ${wpPost.id}:`, e);
          }
        }

        // Map categories
        const strapiCatIds = (wpPost.categories || [])
          .map((id: number) => categoryMap.get(id))
          .filter((id: number | undefined): id is number => id !== undefined);

        // Create the post in Strapi
        const createdPost = await strapi.documents('api::post.post').create({
          data: {
            title: wpPost.title.rendered,
            slug: wpPost.slug,
            content: wpPost.content.rendered,
            excerpt: wpPost.excerpt.rendered,
            wp_id: wpPost.id,
            featured_image: featuredImageId,
            categories: strapiCatIds,
            publish_date: wpPost.date ? wpPost.date.split('T')[0] : null,
            createdAt: wpPost.date || new Date(),
            updatedAt: wpPost.date || new Date(),
            publishedAt: wpPost.date || new Date(),
          },
          status: 'published',
        });
        strapiPostId = createdPost.id;
        console.log(`  ➕ Created Post successfully (Strapi ID: ${strapiPostId}).`);
      }
      postMap.set(wpPost.id, strapiPostId);
    }

    // 3. Comments Migration
    console.log('\n💬 [STEP 3] Migrating Comments...');
    const commentsRes = await fetchWithRetry(`${WP_API}/comments&per_page=100`);
    if (commentsRes.ok) {
      const wpComments = (await commentsRes.json()) as any[];
      console.log(`Fetched ${wpComments.length} comments from WordPress.`);

      for (const wpComment of wpComments) {
        console.log(`• Processing comment by "${wpComment.author_name}" on WP Post: ${wpComment.post}`);

        // Find associated post ID in Strapi
        let strapiPostId: any = postMap.get(wpComment.post);
        if (!strapiPostId) {
          const postCheck = await strapi.documents('api::post.post').findMany({
            filters: { wp_id: wpComment.post },
          });
          if (postCheck && postCheck.length > 0) {
            strapiPostId = postCheck[0].id;
          }
        }

        if (!strapiPostId) {
          console.log(`  ⚠ Skipping comment: Associated post with WP ID ${wpComment.post} does not exist.`);
          continue;
        }

        // Check if comment exists
        const existingComment = await strapi.documents('api::comment.comment').findMany({
          filters: { wp_id: wpComment.id },
        });

        if (existingComment && existingComment.length > 0) {
          console.log(`  ✔ Comment already exists (Strapi ID: ${existingComment[0].id}).`);
        } else {
          const createdComment = await strapi.documents('api::comment.comment').create({
            data: {
              author_name: wpComment.author_name,
              author_email: wpComment.author_email || 'anonymous@example.com',
              content: wpComment.content.rendered,
              wp_id: wpComment.id,
              post: strapiPostId,
              createdAt: wpComment.date || new Date(),
              updatedAt: wpComment.date || new Date(),
              publishedAt: wpComment.date || new Date(),
            },
            status: 'published',
          });
          console.log(`  ➕ Created Comment (Strapi ID: ${createdComment.id}) linked to Post ${strapiPostId}.`);
        }
      }
    }

    // 4. Portfolio & Capability Seed Pipeline
    console.log('\n📂 [STEP 4] Seeding Capabilities & Portfolio...');
    
    // Seed Capabilities
    const capabilitiesToSeed = [
      { name: 'Communications', slug: 'communications' },
      { name: 'Event Management', slug: 'event-management' },
      { name: 'Campaign', slug: 'campaign' },
      { name: 'Web & Mobile', slug: 'web-and-mobile' },
      { name: 'Print', slug: 'print' },
      { name: 'Media & Film', slug: 'media-and-film' }
    ];

    const capabilityMap = new Map<string, any>();

    for (const cap of capabilitiesToSeed) {
      const existing = await strapi.documents('api::capability.capability').findMany({
        filters: { slug: cap.slug },
      });

      let capId: any;
      if (existing && existing.length > 0) {
        capId = existing[0].id;
        console.log(`✔ Capability "${cap.name}" already exists (Strapi ID: ${capId}).`);
      } else {
        const created = await strapi.documents('api::capability.capability').create({
          data: {
            name: cap.name,
            slug: cap.slug,
          },
          status: 'published',
        });
        capId = created.id;
        console.log(`➕ Created Capability: "${cap.name}" (Strapi ID: ${capId}).`);
      }
      capabilityMap.set(cap.slug, capId);
    }

    // Seed Portfolio Projects
    const projectsToSeed = [
      {
        title: "Wole Soyinka at 90",
        slug: "wole-soyinka-at-90",
        client: "Wole Soyinka Foundation",
        overview: "Del-York Communications managed the event management, branding, and comprehensive public relations campaign celebrating the iconic Nobel Laureate, Prof. Wole Soyinka, at 90.",
        team: "Del-York PR & Strategic Events Team",
        capabilities: ["communications", "event-management"],
        imageFile: "wole-soyinka.jpg",
        content: `<h2>Celebrating the Legacy of a Giant</h2><p>Our team delivered a masterfully executed communications campaign and luxury event to mark the 90th birthday celebration of Nobel Laureate, Professor Wole Soyinka.</p><h3>Scope of Work</h3><ul><li>Strategic Public Relations and Media Coordination</li><li>High-end VIP Event Production and Stage Design</li><li>Comprehensive Media Coverage and Live-Streaming Integration</li></ul><p>The campaign captured the nation's heart, bringing together dignitaries, artists, and global citizens to honor his immense contribution to world literature and democratic ideals.</p>`
      },
      {
        title: "Manufacturers Association of Nigeria",
        slug: "manufacturers-association-of-nigeria",
        client: "Manufacturers Association of Nigeria (MAN)",
        overview: "A high-impact advocacy campaign and industrial exhibition produced for the Manufacturers Association of Nigeria. We facilitated public affairs communications and premium event staging.",
        team: "Del-York Corporate Communications Division",
        capabilities: ["event-management", "communications"],
        imageFile: "man-event.jpg",
        content: `<h2>Advocating for African Industrialization</h2><p>Del-York proudly managed the end-to-end corporate communications and industrial exhibition for the Manufacturers Association of Nigeria (MAN).</p><h3>Core Accomplishments</h3><ul><li>Facilitated government relations and policy roundtables</li><li>Designed and engineered high-capacity interactive exhibition pavilions</li><li>Secured first-tier media placements and corporate features</li></ul>`
      },
      {
        title: "Islamic Development Bank Group (IsDB Group)",
        slug: "islamic-development-bank-group",
        client: "IsDB Group",
        overview: "Strategic national branding and media campaigns executed for the Islamic Development Bank Group, securing cross-regional collaborations and promoting social infrastructure investment across Africa.",
        team: "Del-York Global Partnerships Team",
        capabilities: ["campaign"],
        imageFile: "isdb-event.jpg",
        content: `<h2>Promoting Social Stature & Infrastructure</h2><p>We designed and executed a multi-channel developmental campaign for the Islamic Development Bank Group across diverse African regions.</p>`
      },
      {
        title: "Lontorpays",
        slug: "lontorpays",
        client: "Lontor",
        overview: "A sleek and immersive fintech mobile banking application experience. We crafted user experience strategies, interactive UI visual design, and brand identity mapping.",
        team: "Del-York Digital Products Team",
        capabilities: ["web-and-mobile"],
        imageFile: "lontorpays.jpg",
        content: `<h2>A Seamless Digital Fintech Stature</h2><p>Crafting a modern and accessible visual user interface for the Lontorpays fintech product, prioritizing usability, safety, and modern design semantics.</p>`
      },
      {
        title: "GAC Motors",
        slug: "gac-motors",
        client: "GAC Motors Nigeria",
        overview: "A premium marketing and artistic print showcase detailing the elite craftsmanship, power, and elegant luxury of GAC Motors' modern fleet.",
        team: "Del-York Brand Design Studio",
        capabilities: ["print", "campaign"],
        imageFile: "gac-motors.jpg",
        content: `<h2>Automotive Elegance Refined</h2><p>We produced an elite artistic print catalog and billboard advertising campaign to position GAC Motors as the premier luxury automotive choice in Nigeria.</p>`
      },
      {
        title: "GAC GS4 Launch",
        slug: "gac-gs4-launch",
        client: "GAC Motors Nigeria",
        overview: "A cinematic launching campaign and media activation for the GAC GS4 SUV. We delivered high-concept video commercials, virtual reality displays, and digital product campaigns.",
        team: "Del-York Film & Broadcast Production Division",
        capabilities: ["media-and-film", "campaign"],
        imageFile: "gac-gs4.jpg",
        content: `<h2>Igniting the Drive for Innovation</h2><p>Our media and broadcast team directed the high-concept digital and cinematic television commercial launch for the GAC GS4 SUV, achieving over 10 million combined brand impressions.</p>`
      }
    ];

    const fs = require('fs');
    const ASSETS_DIR = '/Users/macbook/Documents/jsproject/dycomms/src/assets';

    for (const project of projectsToSeed) {
      const existing = await strapi.documents('api::portfolio.portfolio').findMany({
        filters: { slug: project.slug },
      });

      if (existing && existing.length > 0) {
        console.log(`✔ Portfolio project "${project.title}" already exists (Strapi ID: ${existing[0].id}).`);
      } else {
        // Upload cover image
        let coverImageId: number | null = null;
        const filepath = path.join(ASSETS_DIR, project.imageFile);

        if (fs.existsSync(filepath)) {
          try {
            const stat = fs.statSync(filepath);
            console.log(`  📥 Seeding local cover image for: "${project.imageFile}"`);

            const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
              data: {},
              files: {
                originalFilename: project.imageFile,
                mimetype: 'image/jpeg',
                size: stat.size,
                filepath: filepath,
              },
            });

            if (uploadedFiles && uploadedFiles.length > 0) {
              coverImageId = uploadedFiles[0].id;
              console.log(`  ✔ Uploaded project cover image (Strapi Media ID: ${coverImageId}).`);
            }
          } catch (e) {
            console.error(`  ⚠ Failed to upload cover image for "${project.title}":`, e);
          }
        } else {
          console.warn(`  ⚠ Local image asset not found at: ${filepath}`);
        }

        // Map capabilities IDs
        const capIds = project.capabilities
          .map(slug => capabilityMap.get(slug))
          .filter(id => id !== undefined);

        // Create Portfolio entry
        const createdPortfolio = await strapi.documents('api::portfolio.portfolio').create({
          data: {
            title: project.title,
            slug: project.slug,
            client: project.client,
            overview: project.overview,
            team: project.team,
            cover_image: coverImageId,
            capabilities: capIds,
            content: project.content,
          },
          status: 'published',
        });

        console.log(`  ➕ Created Portfolio project: "${project.title}" (Strapi ID: ${createdPortfolio.id}).`);
      }
    }

    // 5. Public API Permissions Automation
    console.log('\n🔐 [STEP 5] Configuring Public API Permissions...');
    const knex = strapi.db.connection;
    
    const publicActions = [
      'api::post.post.find',
      'api::post.post.findOne',
      'api::category.category.find',
      'api::category.category.findOne',
      'api::comment.comment.find',
      'api::comment.comment.findOne',
      'api::comment.comment.create',
      'api::portfolio.portfolio.find',
      'api::portfolio.portfolio.findOne',
      'api::capability.capability.find',
      'api::capability.capability.findOne'
    ];

    for (const action of publicActions) {
      // Check if permission already exists in up_permissions
      const existingPermission = await knex('up_permissions')
        .where({ action })
        .first();

      let permissionId: number;

      if (existingPermission) {
        permissionId = existingPermission.id;
      } else {
        // Generate a simple 24-character random string for document_id
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let documentId = '';
        for (let i = 0; i < 24; i++) {
          documentId += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const [newPerm] = await knex('up_permissions')
          .insert({
            document_id: documentId,
            action,
            created_at: new Date(),
            updated_at: new Date(),
            published_at: new Date(),
          })
          .returning('id');
        
        permissionId = typeof newPerm === 'object' ? newPerm.id : newPerm;
        console.log(`  ✔ Registered action in permissions table: "${action}" (ID: ${permissionId})`);
      }

      // Check if link exists in up_permissions_role_lnk to Public role (role_id: 2)
      const existingLink = await knex('up_permissions_role_lnk')
        .where({ permission_id: permissionId, role_id: 2 })
        .first();

      if (!existingLink) {
        await knex('up_permissions_role_lnk').insert({
          permission_id: permissionId,
          role_id: 2,
          permission_ord: 1,
        });
        console.log(`  ➕ Granted Public Role access to: "${action}"`);
      }
    }

    console.log('\n======================================================');
    console.log('🎉 WP-TO-STRAPI MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ MIGRATION PIPELINE FAILED:', error);
  }
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.RUN_MIGRATION === 'true') {
      // Delay execution slightly to ensure Strapi server binds and boots fully
      setTimeout(() => {
        runMigration(strapi);
      }, 1500);
    }
  },
};
