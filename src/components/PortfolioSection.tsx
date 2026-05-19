import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Asterisk, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import wole_soyinka from "@/assets/wole-soyinka.jpg";
import man_event from "@/assets/man-event.jpg";
import isdb_event from "@/assets/isdb-event.jpg";
import lontorpays from "@/assets/lontorpays.jpg";
import gac_motors from "@/assets/gac-motors.jpg";
import gac_gs4 from "@/assets/gac-gs4.jpg";
import { BACKEND_URL } from "@/services/api";
import { usePortfoliosQuery } from "@/services/queries";

const defaultProjects = [
  {
    img: wole_soyinka,
    title: "Wole Soyinka at 90",
    category: "Communications",
    desc: "Event management and communications for Wole Soyinka at 90.",
    slug: "wole-soyinka-at-90"
  },
  {
    img: man_event,
    title: "Manufacturers Association of Nigeria",
    category: "Event Management",
    desc: "Event management and communications for Manufacturers Association of Nigeria.",
    slug: "manufacturers-association-of-nigeria"
  },
  {
    img: isdb_event,
    title: "Islamic Development Bank Group (IsDB Group)",
    category: "Campaign",
    desc: "Event management and communications for Islamic Development Bank Group (IsDB Group).",
    slug: "islamic-development-bank-group"
  },
  {
    img: lontorpays,
    title: "Lontorpays",
    category: "Web & Mobile",
    desc: "Crafting a seamless and immersive digital product experience for fintech.",
    slug: "lontorpays"
  },
  {
    img: gac_motors,
    title: "GAC Motors",
    category: "Print",
    desc: "Showcasing the pinnacle of automotive luxury through bold, cinematic visuals.",
    slug: "gac-motors"
  },
  {
    img: gac_gs4,
    title: "GAC GS4 Launch",
    category: "Media & Film",
    desc: "A bold launch campaign that captured the imagination of Nigerian car lovers.",
    slug: "gac-gs4-launch"
  },
];

const PortfolioSection = () => {
  const { data: serverPortfolios } = usePortfoliosQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filterCategory, setFilterCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openArchive) {
      setIsModalOpen(true);
    }
  }, [location]);

  const projects = serverPortfolios && serverPortfolios.length > 0
    ? serverPortfolios.map((item) => {
      const coverImage = item.cover_image?.url
        ? `${BACKEND_URL}${item.cover_image.url}`
        : null;

      const categoryName = item.capabilities && item.capabilities.length > 0
        ? item.capabilities[0].name
        : "Creative Strategy";

      let fallbackImg = wole_soyinka;
      const slug = item.slug || "";
      if (slug.includes("man")) fallbackImg = man_event;
      else if (slug.includes("islamic") || slug.includes("isdb")) fallbackImg = isdb_event;
      else if (slug.includes("lontor")) fallbackImg = lontorpays;
      else if (slug.includes("gac-motors")) fallbackImg = gac_motors;
      else if (slug.includes("gac-gs4")) fallbackImg = gac_gs4;

      return {
        img: coverImage || fallbackImg,
        title: item.title,
        category: categoryName,
        desc: item.overview || item.title,
        slug: slug,
      };
    })
    : defaultProjects;

  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Extract unique categories for quick filtering in the fullscreen modal
  const uniqueCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filtered projects list inside the modal
  const filteredProjects = filterCategory === "All"
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  const handleModalScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 120) {
      if (visibleCount < filteredProjects.length) {
        setVisibleCount((prev) => Math.min(prev + 3, filteredProjects.length));
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVisibleCount(6);
    setFilterCategory("All");
  };

  return (
    <>
      <section id="portfolio" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Asterisk className="w-5 h-5 text-primary" />
              <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">Selected Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Our featured <span className="text-primary">portfolio.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/60 text-base max-w-sm font-body leading-relaxed md:mb-2"
          >
            A curated showcase of our drive to transform African brands with global excellence.
          </motion.p>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Link
              to={`/work/${project.slug}`}
              key={index}
              className="block overflow-hidden group"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                className="relative aspect-[4/3] overflow-hidden border border-white/5 shadow-lg bg-black/40"
              >
                {/* Project Image */}
                <motion.img
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Black Gradient Base Layer (Subtle visibility even without hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                {/* Base Info (Visible initially at the bottom, fades on hover) */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                  <div>
                    <span className="text-primary text-[10px] uppercase tracking-widest font-mono block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Immersive Hover Overlay Text Effect */}
                <motion.div
                  variants={{
                    hover: { opacity: 1, y: 0 }
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm p-8 flex flex-col justify-end text-left pointer-events-none group-hover:pointer-events-auto"
                >
                  <div className="mb-auto flex justify-between items-start">
                    <span className="text-primary text-xs uppercase tracking-widest font-mono">
                      {project.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-foreground/60 text-sm max-w-md text-center md:text-left">
            At our Creative Digital Agency, we bring your ideas to life by crafting engaging and impactful experiences.
          </p>
          <div className="hidden md:block flex-1 h-px bg-border/30 mx-8" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group font-medium"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            See All Projects
          </button>
        </motion.div>

      </div>
      </section>

    {/* Portal: renders directly into document.body, fully escaping all parent overflow constraints */}
    {createPortal(
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            {/* Scrollable inner container */}
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
              {/* Close Button */}
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
                      Complete Archives
                    </span>
                  </div>
                  <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Our Selected <span className="text-[#a40000] italic">Works</span>
                  </h2>
                  <p className="text-foreground/60 text-sm max-w-lg mx-auto mb-10 leading-relaxed font-body">
                    Browse our full chronicles of global creative impact. Scroll down inside the modal to lazy load more works, or filter dynamically by capability below.
                  </p>

                  {/* Filter Categories Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {uniqueCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setFilterCategory(cat);
                          setVisibleCount(6); // Reset lazy load on filter change
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
                  {filteredProjects.slice(0, visibleCount).map((project, index) => (
                    <Link
                      to={`/work/${project.slug}`}
                      state={{ fromArchive: true }}
                      key={project.slug + index}
                      onClick={() => {
                        closeModal();
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                      className="block overflow-hidden group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover="hover"
                        className="relative aspect-[4/3] overflow-hidden border border-white/5 shadow-lg bg-black/40"
                      >
                        <motion.img
                          variants={{
                            hover: { scale: 1.05 }
                          }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                          <div>
                            <span className="text-[#a40000] text-[10px] uppercase tracking-widest font-mono block mb-1 font-bold">
                              {project.category}
                            </span>
                            <h3 className="font-heading text-lg font-bold text-white">
                              {project.title}
                            </h3>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div
                          variants={{
                            hover: { opacity: 1, y: 0 }
                          }}
                          initial={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-black/90 backdrop-blur-sm p-8 flex flex-col justify-end text-left pointer-events-none group-hover:pointer-events-auto"
                        >
                          <div className="mb-auto flex justify-between items-start">
                            <span className="text-[#a40000] text-xs uppercase tracking-widest font-mono font-bold">
                              {project.category}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-[#a40000] text-white flex items-center justify-center transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <ArrowUpRight className="w-5 h-5" />
                            </div>
                          </div>

                          <div className="mt-auto">
                            <h3 className="font-heading text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                              {project.title}
                            </h3>
                            <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4 max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                              {project.desc}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Lazy Scrolling loading indicator */}
                {visibleCount < filteredProjects.length && (
                  <div className="flex justify-center items-center mt-12 gap-2 text-white/50 text-xs font-mono tracking-widest uppercase animate-pulse">
                    <Asterisk className="w-4 h-4 animate-spin text-[#a40000]" />
                    Scroll to lazy-load more works
                  </div>
                )}
              </div>{/* closes container mx-auto max-w-6xl */}
            </div>{/* closes scrollable inner div */}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>);
};

export default PortfolioSection;
