import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { img: project1, title: "Branding Agency", date: "11 Sep, 2025" },
  { img: project2, title: "Product Design", date: "11 Sep, 2025" },
  { img: project3, title: "Creative Marketing", date: "11 Sep, 2025" },
];

const PortfolioSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  width={900}
                  height={800}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <h3 className="font-heading text-xl md:text-2xl font-bold">{project.title}</h3>
                <p className="text-foreground/50 text-xs mt-1 underline underline-offset-4">{project.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
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
