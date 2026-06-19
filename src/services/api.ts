export const BACKEND_URL = import.meta.env.VITE_API_URL || "https://stable-cherry-68f716b8e6.strapiapp.com";

export interface StrapiPortfolio {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  client: string;
  overview: string;
  team: string;
  content: string;
  cover_image?: {
    url: string;
  };
  capabilities?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface StrapiComment {
  id: number;
  author_name: string;
  author_email: string;
  content: string;
  createdAt: string;
}

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt?: string;
  publish_date?: string;
  featured_image?: {
    url: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  comments?: StrapiComment[];
}

export interface StrapiJobListing {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  description?: string;
  requirements?: string;
  is_active?: boolean;
}

export interface StrapiApplication {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  cover_letter: string;
  portfolio_url?: string;
  job_listing?: number;
}

/**
 * Fetch all portfolios from Strapi
 */
export async function getPortfolios(): Promise<StrapiPortfolio[]> {
  const res = await fetch(`${BACKEND_URL}/api/portfolios?populate=*`);
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch a single portfolio by its slug
 */
export async function getPortfolioBySlug(slug: string): Promise<StrapiPortfolio | null> {
  const res = await fetch(`${BACKEND_URL}/api/portfolios?filters[slug][$eq]=${slug}&populate=*`);
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data?.[0] || null;
}

/**
 * Fetch latest blog posts from Strapi
 */
export async function getLatestPosts(limit = 3): Promise<StrapiPost[]> {
  const res = await fetch(`${BACKEND_URL}/api/posts?populate=*&pagination[pageSize]=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch all posts from Strapi
 */
export async function getPosts(): Promise<StrapiPost[]> {
  const res = await fetch(`${BACKEND_URL}/api/posts?populate=*`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch a single blog post by its slug
 */
export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
  const res = await fetch(`${BACKEND_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data?.[0] || null;
}

/**
 * Create a new comment in Strapi linked to a specific post
 */
export async function createComment(
  authorName: string,
  authorEmail: string,
  content: string,
  postId: number
): Promise<StrapiComment> {
  const res = await fetch(`${BACKEND_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        author_name: authorName,
        author_email: authorEmail,
        content: content,
        post: postId,
      },
      status: "published",
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create comment: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

/**
 * Fetch all active job listings from Strapi
 */
export async function getJobListings(): Promise<StrapiJobListing[]> {
  const res = await fetch(`${BACKEND_URL}/api/job-listings?filters[is_active][$eq]=true&sort=createdAt:desc`);
  if (!res.ok) {
    // Silently return empty array if endpoint doesn't exist yet
    return [];
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Submit a job application to Strapi
 */
export async function submitJobApplication(data: {
  full_name: string;
  email: string;
  phone?: string;
  cover_letter: string;
  portfolio_url?: string;
  job_listing?: number;
}): Promise<StrapiApplication> {
  const res = await fetch(`${BACKEND_URL}/api/job-applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit application: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}
