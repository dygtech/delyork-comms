import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
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

  return (
    <>
      <section id="portfolio" className="py-20 lg:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tight uppercase"
              >
                Our<br />Work
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pb-2"
            >
              <Link
                to="/works"
                className="inline-flex items-center gap-2 text-foreground font-body text-base md:text-lg border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
              >
                See all case studies &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default PortfolioSection;
