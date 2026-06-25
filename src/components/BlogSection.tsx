import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk, ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import { BACKEND_URL } from "@/services/api";
import { useLatestPostsQuery, usePostsQuery } from "@/services/queries";

const defaultPosts = [
  { img: blog1, title: "Your Partner In Creative Growth", category: "Development", date: "September 23, 2025", slug: "your-partner-in-creative-growth", excerpt: "At DYC, we don't just build brand strategies; we build active partnerships that foster continuous creative growth." },
  { img: blog2, title: "Innovative Strategies, Stunning Results", category: "Technology", date: "September 23, 2025", slug: "innovative-strategies-stunning-results", excerpt: "Discover how cutting-edge tools and human-centered design principles combine to produce breathtaking brand transformations." },
  { img: blog3, title: "Crafting Digital Solutions For Tomorrow", category: "Development", date: "September 23, 2025", slug: "crafting-digital-solutions-for-tomorrow", excerpt: "Exploring the next frontier of user experience, platform accessibility, and multi-channel engagement in the digital era." },
];

const BlogSection = () => {
  const { data: serverPosts } = useLatestPostsQuery(3);
  const { data: serverAllPosts } = usePostsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filterCategory, setFilterCategory] = useState("All");
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.openBlogArchive) {
      setIsModalOpen(true);
    }
  }, [location]);

  // Lock/unlock body scroll — portal handles its own scroll independently
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  // Map helper for Strapi items
  const mapPost = (item: any, idx: number) => {
    const coverImage = item.featured_image?.url
      ? `${BACKEND_URL}${item.featured_image.url}`
      : null;

    const categoryName = item.categories && item.categories.length > 0
      ? item.categories[0].name
      : "Development";

    const rawDate = item.publish_date || item.publishedAt;
    const postDate = rawDate
      ? new Date(rawDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      : "September 23, 2025";

    let fallbackImg = blog1;
    if (idx === 1) fallbackImg = blog2;
    else if (idx === 2) fallbackImg = blog3;

    return {
      img: coverImage || fallbackImg,
      title: item.title,
      category: categoryName,
      date: postDate,
      slug: item.slug || "",
      excerpt: item.excerpt?.replace(/<[^>]*>/g, "") || item.title,
    };
  };

  const posts = serverPosts && serverPosts.length > 0
    ? serverPosts.map((item, idx) => mapPost(item, idx))
    : defaultPosts;

  const allPostsList = serverAllPosts && serverAllPosts.length > 0
    ? serverAllPosts.map((item, idx) => mapPost(item, idx))
    : defaultPosts;

  const uniqueCategories = ["All", ...Array.from(new Set(allPostsList.map((p) => p.category)))];

  const filteredPosts = filterCategory === "All"
    ? allPostsList
    : allPostsList.filter((p) => p.category === filterCategory);

  const handleModalScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 120) {
      if (visibleCount < filteredPosts.length) {
        setVisibleCount((prev) => Math.min(prev + 3, filteredPosts.length));
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVisibleCount(6);
    setFilterCategory("All");
  };

  // Portal modal — rendered directly into document.body, completely escaping any parent overflow constraints
  const modal = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        >
          {/* Scrollable inner container — this is what actually scrolls */}
          <div
            ref={scrollRef}
            onScroll={handleModalScroll}
            data-lenis-prevent
            style={{
              position: "absolute",
              inset: 0,
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              backgroundColor: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(20px)",
            }}
            className="px-6 py-20"
          >
            {/* Close Button — fixed relative to the viewport */}
            <button
              onClick={closeModal}
              className="fixed top-8 right-8 z-[10000] p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#a40000] hover:border-[#a40000] text-white transition-all group"
            >
              <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="container mx-auto max-w-6xl">
              {/* Modal Header */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Asterisk className="w-5 h-5 text-[#a40000] animate-spin-slow" />
                  <span className="text-foreground/60 text-xs uppercase tracking-widest font-mono font-bold">
                    Complete Journal
                  </span>
                </div>
                <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                  DYC Editorial <span className="text-[#a40000] italic">Insight</span>
                </h2>
                <p className="text-foreground/60 text-sm max-w-lg mx-auto mb-10 leading-relaxed font-body">
                  Deep dives into the intersection of creativity, technology, and corporate communications. Scroll down to lazy load more articles.
                </p>

                {/* Filter Category Chips */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilterCategory(cat);
                        setVisibleCount(6);
                        if (scrollRef.current) scrollRef.current.scrollTop = 0;
                      }}
                      className={`px-6 py-2.5 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all border ${filterCategory === cat
                          ? "bg-[#a40000] border-[#a40000] text-white shadow-lg shadow-[#a40000]/25"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lazy Scrolling Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.slice(0, visibleCount).map((post, index) => (
                  <Link
                    to={`/blog/${post.slug}`}
                    state={{ fromBlogArchive: true }}
                    key={post.slug + index}
                    onClick={() => {
                      closeModal();
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className="block overflow-hidden group border border-white/5"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      whileHover="hover"
                      className="relative aspect-[4/3] overflow-hidden bg-black/40 shadow-lg"
                    >
                      <motion.img
                        variants={{ hover: { scale: 1.05 } }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                        <div>
                          <span className="text-[#a40000] text-[10px] uppercase tracking-widest font-mono block mb-1 font-bold">
                            {post.category}
                          </span>
                          <h3 className="font-heading text-base font-bold text-white line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <span className="text-white/40 text-[10px] font-mono block mt-2">— {post.date}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 ml-4">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        variants={{ hover: { opacity: 1, y: 0 } }}
                        initial={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm p-8 flex flex-col justify-end text-left pointer-events-none group-hover:pointer-events-auto"
                      >
                        <div className="mb-auto flex justify-between items-start">
                          <span className="text-[#a40000] text-xs uppercase tracking-widest font-mono font-bold">
                            {post.category}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-[#a40000] text-white flex items-center justify-center transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="mt-auto">
                          <h3 className="font-heading text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4 max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <span className="text-white/40 text-[10px] font-mono block mt-2">— {post.date}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Lazy load indicator */}
              {visibleCount < filteredPosts.length && (
                <div className="flex justify-center items-center mt-12 gap-2 text-white/50 text-xs font-mono tracking-widest uppercase animate-pulse">
                  <Asterisk className="w-4 h-4 animate-spin text-[#a40000]" />
                  Scroll to lazy-load more articles
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section id="blog" className="py-20 lg:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
              <span className="text-foreground/60 text-sm uppercase tracking-widest font-mono font-bold">Latest News & Posts</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Learn From Journal Insight{" "}
              <span className="text-primary">Of DYC</span>
            </h2>
            <p className="text-foreground/60 text-sm mt-4 max-w-xl mx-auto font-body">
              At our Creative Digital Agency, we bring your ideas to life by crafting engaging and impactful digital experiences that captivate global audiences.
            </p>
          </motion.div>

          {/* Standard Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <Link
                to={`/blog/${post.slug}`}
                key={idx}
                className="group overflow-hidden bg-card relative aspect-[4/3] border border-white/5"
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent p-6 flex flex-col justify-end">
                  <div>
                    <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 font-mono font-bold">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold mt-3 text-white line-clamp-2 leading-snug">{post.title}</h3>
                    <p className="text-foreground/50 text-xs mt-2 font-mono">— {post.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Bar & See All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border/10 pt-10"
          >
            <p className="text-foreground/60 text-sm max-w-md text-center md:text-left font-body">
              Stay up to date with contemporary brand dynamics, design strategies, and technological transformations.
            </p>
            <div className="hidden md:block flex-1 h-px bg-border/30 mx-8" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group font-medium"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              See All Journal Posts
            </button>
          </motion.div>
        </div>
      </section>

      {/* Portal: renders directly into document.body, fully escaping all parent overflow constraints */}
      {createPortal(modal, document.body)}
    </>
  );
};

export default BlogSection;
