import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import wole_soyinka from "@/assets/wole-soyinka.jpg";
import man_event from "@/assets/man-event.jpg";
import isdb_event from "@/assets/isdb-event.jpg";
import lontorpays from "@/assets/lontorpays.jpg";
import gac_motors from "@/assets/gac-motors.jpg";
import gac_gs4 from "@/assets/gac-gs4.jpg";

const projects = [
  {
    img: wole_soyinka,
    title: "Wole Soyinka at 90",
    category: "Communications",
    desc: "Event management and communications for Wole Soyinka at 90."
  },
  {
    img: man_event,
    title: "Manufacturers Association of Nigeria",
    category: "Event Management",
    desc: "Event management and communications for Manufacturers Association of Nigeria."
  },
  {
    img: isdb_event,
    title: "Islamic Development Bank Group (IsDB Group)",
    category: "Campaign",
    desc: "Event management and communications for Islamic Development Bank Group (IsDB Group)."
  },
  {
    img: lontorpays,
    title: "Lontorpays",
    category: "Web & Mobile",
    desc: "Crafting a seamless and immersive digital product experience for fintech."
  },
  {
    img: gac_motors,
    title: "GAC Motors",
    category: "Print",
    desc: "Showcasing the pinnacle of automotive luxury through bold, cinematic visuals."
  },
  {
    img: gac_gs4,
    title: "GAC GS4 Launch",
    category: "Media & Film",
    desc: "A bold launch campaign that captured the imagination of Nigerian car lovers."
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-background relative overflow-hidden">
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              className="relative aspect-[4/3] overflow-hidden group cursor-pointer border border-white/5 shadow-lg bg-black/40"
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
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group font-medium"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            See All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
