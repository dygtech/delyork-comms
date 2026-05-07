import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { img: project1, title: "Branding Agency", date: "11 Sep, 2025" },
  { img: project2, title: "Product Design", date: "11 Sep, 2025" },
  { img: project3, title: "Creative Marketing", date: "11 Sep, 2025" },
];

const ProjectCard = ({ 
  project, 
  index, 
  progress, 
  range, 
  targetScale 
}: { 
  project: any; 
  index: number; 
  progress: any; 
  range: number[]; 
  targetScale: number 
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5% + ${index * 25}px)` }}
        className="relative h-[450px] md:h-[550px] w-full bg-[#1a1a1a] rounded-3xl overflow-hidden origin-top border border-white/5 shadow-2xl"
      >
        <div className="absolute inset-0">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
          <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-white/60 text-xs md:text-sm font-body underline underline-offset-4">
            {project.date}
          </p>
        </div>

        <div className="absolute bottom-8 right-8">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={container} className="relative py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Sticky Projects List */}
        <div className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - ( (projects.length - i) * 0.05);
            return (
              <ProjectCard 
                key={i} 
                index={i} 
                project={project} 
                progress={scrollYProgress} 
                range={[i * 0.33, 1]} 
                targetScale={targetScale}
              />
            );
          })}
        </div>

        {/* Original Bottom bar restored */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-foreground/60 text-sm max-w-md">
            At our Creative Digital Agency, we bring your ideas to life
            beach rafting engaging impactful experiences
          </p>
          <div className="hidden md:block flex-1 h-px bg-border/30 mx-8" />
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group"
          >
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            See All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
