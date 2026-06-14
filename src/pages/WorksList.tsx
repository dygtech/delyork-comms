import { useState } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame, useMotionValue } from "framer-motion";
import { Asterisk, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { usePortfoliosQuery } from "@/services/queries";
import { BACKEND_URL } from "@/services/api";

import wole_soyinka from "@/assets/wole-soyinka.jpg";
import man_event from "@/assets/man-event.jpg";
import isdb_event from "@/assets/isdb-event.jpg";
import lontorpays from "@/assets/lontorpays.jpg";
import gac_motors from "@/assets/gac-motors.jpg";
import gac_gs4 from "@/assets/gac-gs4.jpg";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const CreativeMarquee = () => {
  const items = ["WORK", "WORK", "WORK", "WORK"];
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const baseVelocity = 3;

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    const dragIntensity = 0.05;
    moveBy += (smoothVelocity.get() * (delta / 1000)) * dragIntensity;
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap bg-background py-10 border-b border-border/10 mt-20">
      <motion.div className="flex" style={{ x }}>
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="flex">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-8 mx-8">
                <span className="font-heading font-black text-foreground text-[5rem] md:text-[8rem] lg:text-[12rem] uppercase leading-none tracking-tighter">
                  {item}
                </span>
                <Asterisk className="w-12 h-12 md:w-20 md:h-20 text-primary animate-spin-slow" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const defaultProjects = [
  { img: wole_soyinka, title: "Wole Soyinka at 90", category: "Communications", slug: "wole-soyinka-at-90" },
  { img: man_event, title: "Manufacturers Association of Nigeria", category: "Event Management", slug: "manufacturers-association-of-nigeria" },
  { img: isdb_event, title: "Islamic Development Bank Group", category: "Campaign", slug: "islamic-development-bank-group" },
  { img: lontorpays, title: "Lontorpays", category: "Web & Mobile", slug: "lontorpays" },
  { img: gac_motors, title: "GAC Motors", category: "Print", slug: "gac-motors" },
  { img: gac_gs4, title: "GAC GS4 Launch", category: "Media & Film", slug: "gac-gs4-launch" },
];

const WorksList = () => {
  const { data: serverPortfolios } = usePortfoliosQuery();
  const [filterCategory, setFilterCategory] = useState("All Projects");

  const projects = serverPortfolios && serverPortfolios.length > 0
    ? serverPortfolios.map((item) => {
      const coverImage = item.cover_image?.url ? `${BACKEND_URL}${item.cover_image.url}` : null;
      const categoryName = item.capabilities && item.capabilities.length > 0 ? item.capabilities[0].name : "Creative Strategy";
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
        slug: slug,
      };
    })
    : defaultProjects;

  const uniqueCategories = ["All Projects", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = filterCategory === "All Projects"
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground min-h-screen"
    >
      <Navbar />

      <CreativeMarquee />

      <section className="py-20 lg:py-32 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-body text-2xl md:text-4xl lg:text-5xl leading-tight font-medium tracking-tight">
            See how we partner with visionary teams to build brands that stand out and push the boundaries of innovation.
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex gap-2 bg-secondary/50 p-2 rounded-full overflow-x-auto max-w-full no-scrollbar">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filterCategory === cat
                    ? "bg-foreground text-background shadow-md"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                  }`}
              >
                {cat} {cat === "All Projects" && `(${projects.length})`}
              </button>
            ))}
          </div>

          {/* <div className="flex gap-2 bg-secondary/50 p-2 rounded-full">
            <button className="px-6 py-2.5 rounded-full text-sm font-medium bg-foreground text-background">Grid</button>
            <button className="px-6 py-2.5 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground">Explore</button>
            <button className="px-6 py-2.5 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground">List</button>
          </div> */}
        </div>

        {/* 2-Column Grid matching Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug + index} project={project} index={index} />
          ))}
        </div>
      </section>

      <Footer />
    </motion.main>
  );
};

export default WorksList;
