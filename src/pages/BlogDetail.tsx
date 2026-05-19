import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Asterisk, Calendar, Folder, BookOpen, MessageSquare } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { usePostBySlugQuery, usePostsQuery, queryKeys } from "@/services/queries";
import { BACKEND_URL, createComment } from "@/services/api";
import Navbar from "@/components/Navbar";

import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

// High quality static fallbacks for offline resilience
const fallbackPosts: Record<string, any> = {
  "your-partner-in-creative-growth": {
    title: "Your Partner In Creative Growth",
    category: "Development",
    date: "September 23, 2025",
    excerpt: "At DYC, we don't just build brand strategies; we build active partnerships that foster continuous creative growth.",
    img: blog1,
    content: `
      <h2>The Foundation of Growth</h2>
      <p>True brand growth is never accidental. It requires a balanced combination of creative experimentation, meticulous audience analysis, and continuous iteration.</p>
      <blockquote>"Growth is an active state of creative courage."</blockquote>
      <p>We work closely with leadership teams to align business goals with compelling narrative strategies that resonate deeply across digital and offline platforms.</p>
    `
  },
  "innovative-strategies-stunning-results": {
    title: "Innovative Strategies, Stunning Results",
    category: "Technology",
    date: "September 23, 2025",
    excerpt: "Discover how cutting-edge tools and human-centered design principles combine to produce breathtaking brand transformations.",
    img: blog2,
    content: `
      <h2>Merging Art and Tech</h2>
      <p>By integrating advanced generative toolsets into our strategy mapping, we help brands visualize their future market share before placing a single media ad.</p>
      <blockquote>"Innovation isn't just about speed; it is about direction."</blockquote>
      <p>This systematic intersection of design thinking and deep analytical auditing enables our clients to lead their respective industries with confidence.</p>
    `
  },
  "crafting-digital-solutions-for-tomorrow": {
    title: "Crafting Digital Solutions For Tomorrow",
    category: "Development",
    date: "September 23, 2025",
    excerpt: "Exploring the next frontier of user experience, platform accessibility, and multi-channel engagement in the digital era.",
    img: blog3,
    content: `
      <h2>The Digital Frontier</h2>
      <p>In a world where attention spans are measured in seconds, design simplicity has become the ultimate luxury. Our approach centers on stripping away the noise to let the core message breathe.</p>
      <blockquote>"Complexity is cheap; simplicity is precious."</blockquote>
      <p>Through robust digital architecture and sleek micro-interactive pathways, we create solutions that are built to thrive for years to come.</p>
    `
  }
};

const defaultComments = [
  { id: 1, author_name: "Adeolu Bakare", content: "This is a remarkably insightful piece on creative strategy. The concept of balanced experimentation resonates deeply with our operations.", createdAt: "2026-05-18T10:30:00Z" },
  { id: 2, author_name: "Chinedu Okafor", content: "DYC continues to set the benchmark in premium brand consultancy. Breathtaking details!", createdAt: "2026-05-19T08:15:00Z" }
];

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromBlogArchive = location.state?.fromBlogArchive || false;

  // 1. Fetch current post by slug
  const { data: serverPost, isLoading } = usePostBySlugQuery(slug || "");
  // 2. Fetch all posts for continuous reading loop
  const { data: allPosts } = usePostsQuery();

  // Comment submission states
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const queryClient = useQueryClient();

  const fallback = fallbackPosts[slug || ""] || fallbackPosts["your-partner-in-creative-growth"];

  const title = serverPost?.title || fallback.title;
  const category = serverPost?.categories?.[0]?.name || fallback.category;
  const excerpt = serverPost?.excerpt?.replace(/<[^>]*>/g, "") || fallback.excerpt;
  
  // Published Date logic
  const rawDate = serverPost?.publish_date || serverPost?.publishedAt;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : fallback.date;

  const coverImage = serverPost?.featured_image?.url
    ? `${BACKEND_URL}${serverPost.featured_image.url}`
    : fallback.img;

  const contentHtml = serverPost?.content || fallback.content;

  // Existing comments list (prefers server comments, falls back to static default comments)
  const commentsList = serverPost?.comments && serverPost.comments.length > 0
    ? serverPost.comments
    : defaultComments;

  // Previous & Next posts loop
  let prevPost = { title: "Your Partner In Creative Growth", slug: "your-partner-in-creative-growth" };
  let nextPost = { title: "Innovative Strategies", slug: "innovative-strategies-stunning-results" };
  
  if (allPosts && allPosts.length > 1) {
    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    
    // Next index
    const nextIndex = (currentIndex + 1) % allPosts.length;
    const nextItem = allPosts[nextIndex];
    nextPost = {
      title: nextItem.title,
      slug: nextItem.slug
    };

    // Prev index
    const prevIndex = (currentIndex - 1 + allPosts.length) % allPosts.length;
    const prevItem = allPosts[prevIndex];
    prevPost = {
      title: prevItem.title,
      slug: prevItem.slug
    };
  } else {
    const keys = Object.keys(fallbackPosts);
    const currentIndex = keys.indexOf(slug || "");
    
    const nextIndex = (currentIndex + 1) % keys.length;
    const nextKey = keys[nextIndex];
    nextPost = {
      title: fallbackPosts[nextKey].title,
      slug: nextKey
    };

    const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    const prevKey = keys[prevIndex];
    prevPost = {
      title: fallbackPosts[prevKey].title,
      slug: prevKey
    };
  }

  const handleNextClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      setSubmitError("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const postId = serverPost?.id || 1;
      await createComment(commentName, commentEmail, commentText, postId);
      
      // Invalidate query to pull the new comment on next mount instantly
      queryClient.invalidateQueries({ queryKey: queryKeys.postBySlug(slug || "") });
      
      setCommentText("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setSubmitError("Failed to submit comment. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-primary selection:text-white overflow-hidden">
      <Navbar />

      {/* Nav spacer */}
      <div className="h-24 md:h-32" />

      {/* Back Button */}
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <Link
          to="/#blog"
          state={{ openBlogArchive: fromBlogArchive }}
          className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>
      </div>

      {/* Hero Header */}
      <header className="container mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
              <span className="text-primary text-xs uppercase tracking-widest font-mono font-bold">
                Journal — {category}
              </span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-12">
              {title}
            </h1>
          </motion.div>

          {/* Post Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-white/10"
          >
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Published
              </div>
              <p className="text-white text-base md:text-lg font-medium">{formattedDate}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <Folder className="w-3.5 h-3.5 text-primary" />
                Category
              </div>
              <p className="text-white text-base md:text-lg font-medium">{category}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                Reading Time
              </div>
              <p className="text-white text-base md:text-lg font-medium">4 mins read</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Cover Image */}
      <section className="w-full px-6 mb-20 md:mb-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[16/9] md:aspect-[21/9] overflow-hidden relative border border-white/10 shadow-2xl"
          >
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="container mx-auto px-6 mb-24 md:mb-36">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Executive Overview Excerpt */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="border-l-2 border-primary pl-6">
              <span className="text-xs uppercase tracking-widest font-mono text-primary block mb-3">
                Key Takeaway
              </span>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                "{excerpt}"
              </p>
            </div>
          </div>

          {/* HTML Rich-Text Body */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            ) : (
              <div 
                className="rich-text-content text-foreground/80 leading-relaxed font-body text-base md:text-lg 
                  [&_p]:mb-8 [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:text-base md:[&_p]:text-lg 
                  [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-white [&_h2]:tracking-tight
                  [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-heading [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-white
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-10 [&_blockquote]:text-white/95 [&_blockquote]:font-serif [&_blockquote]:text-lg md:[&_blockquote]:text-xl [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg
                  [&_img]:my-10 [&_img]:w-full [&_img]:object-cover [&_img]:max-h-[600px] [&_img]:border [&_img]:border-white/10
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_ul]:space-y-3 [&_ul]:text-white/80
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol]:space-y-3 [&_ol]:text-white/80
                  [&_a]:text-primary [&_a]:underline hover:[&_a]:text-white [&_a]:transition-colors"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
          </div>

        </div>
      </section>

      {/* Discussion Forum / Comment System */}
      <section className="container mx-auto px-6 mb-24 max-w-4xl border-t border-white/10 pt-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-white flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          Discussion ({commentsList.length})
        </h2>

        {/* Existing Comments list */}
        <div className="space-y-6 mb-16">
          {commentsList.length === 0 ? (
            <p className="text-white/40 text-sm italic font-body">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            commentsList.map((comm: any, idx: number) => (
              <div key={comm.id || idx} className="p-6 bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">{comm.author_name}</span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {new Date(comm.createdAt || comm.createdAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-body">{comm.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <div className="p-8 bg-[#121214] border border-white/5">
          <h3 className="font-heading text-lg font-bold mb-6 text-white uppercase tracking-wider">Leave a Comment</h3>
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-body">
              Comment posted successfully!
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-body">
              {submitError}
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 mb-2 font-bold">Name *</label>
                <input
                  type="text"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/[0.08] transition-colors"
                  placeholder="e.g. Adeolu Bakare"
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 mb-2 font-bold">Email *</label>
                <input
                  type="email"
                  required
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/[0.08] transition-colors"
                  placeholder="e.g. adeolu@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-mono text-white/40 mb-2 font-bold">Comment *</label>
              <textarea
                required
                rows={5}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:bg-white/[0.08] transition-colors resize-none"
                placeholder="Share your perspective..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-primary hover:bg-[#a40000] hover:text-white text-white px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Posting Comment..." : "Post Comment"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Dual-Panel dynamic prev/next case study footer navigation */}
      <footer className="w-full bg-[#121214] border-t border-white/5 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 relative">
        
        {/* Previous Post Panel */}
        <Link
          to={`/blog/${prevPost.slug}`}
          onClick={handleNextClick}
          state={location.state} // Preserve back-to-archive state!
          className="block w-full py-16 md:py-24 px-8 md:px-12 relative overflow-hidden group/prev hover:bg-white/[0.02] transition-all duration-500 text-left"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover/prev:bg-primary/[0.02] transition-colors duration-700" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover/prev:bg-primary group-hover/prev:border-primary group-hover/prev:text-white transition-all duration-500 transform group-hover/prev:-translate-x-2">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-white/40 text-xs uppercase tracking-widest font-mono font-bold group-hover/prev:text-primary transition-colors">
              Previous Article
            </span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white/80 group-hover/prev:text-white transition-colors duration-500 relative z-10 line-clamp-2 leading-snug">
            {prevPost.title}
          </h3>
        </Link>

        {/* Next Post Panel */}
        <Link
          to={`/blog/${nextPost.slug}`}
          onClick={handleNextClick}
          state={location.state} // Preserve back-to-archive state!
          className="block w-full py-16 md:py-24 px-8 md:px-12 relative overflow-hidden group/next hover:bg-white/[0.02] transition-all duration-500 text-right"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover/next:bg-primary/[0.02] transition-colors duration-700" />
          <div className="flex items-center gap-4 mb-4 justify-end relative z-10">
            <span className="text-white/40 text-xs uppercase tracking-widest font-mono font-bold group-hover/next:text-primary transition-colors">
              Next Article
            </span>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover/next:bg-primary group-hover/next:border-primary group-hover/next:text-white transition-all duration-500 transform group-hover/next:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white/80 group-hover/next:text-white transition-colors duration-500 relative z-10 line-clamp-2 leading-snug">
            {nextPost.title}
          </h3>
        </Link>

      </footer>
    </div>
  );
};

export default BlogDetail;
