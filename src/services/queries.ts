import { useQuery } from "@tanstack/react-query";
import { getPortfolios, getLatestPosts, getPortfolioBySlug, getPosts, getPostBySlug } from "./api";

export const queryKeys = {
  portfolios: ["portfolios"] as const,
  portfolioBySlug: (slug: string) => ["portfolio", slug] as const,
  latestPosts: (limit: number) => ["posts", "latest", limit] as const,
  posts: ["posts"] as const,
  postBySlug: (slug: string) => ["post", slug] as const,
};

/**
 * React Query hook to get published portfolios
 */
export function usePortfoliosQuery() {
  return useQuery({
    queryKey: queryKeys.portfolios,
    queryFn: () => getPortfolios(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
  });
}

/**
 * React Query hook to get a single portfolio by slug
 */
export function usePortfolioBySlugQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.portfolioBySlug(slug),
    queryFn: () => getPortfolioBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
    enabled: !!slug,
  });
}

/**
 * React Query hook to get latest blog posts
 */
export function useLatestPostsQuery(limit = 3) {
  return useQuery({
    queryKey: queryKeys.latestPosts(limit),
    queryFn: () => getLatestPosts(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
  });
}

/**
 * React Query hook to get all posts
 */
export function usePostsQuery() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
  });
}

/**
 * React Query hook to get a single post by slug
 */
export function usePostBySlugQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.postBySlug(slug),
    queryFn: () => getPostBySlug(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes cache validity
    enabled: !!slug,
  });
}
