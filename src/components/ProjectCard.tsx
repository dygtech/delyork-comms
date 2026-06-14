import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface ProjectType {
  slug: string;
  img: string;
  title: string;
  desc?: string;
  category: string;
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Link to={`/work/${project.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className="relative aspect-[4/3] overflow-hidden mb-6 bg-secondary/10 cursor-none"
          data-project-hover="true"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info Text below image */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.desc && (
              <p className="font-body text-base text-foreground/80 mt-1">
                {project.desc.length > 40 ? `${project.desc.substring(0, 40)}...` : project.desc}
              </p>
            )}
          </div>
          <span className="font-body text-sm md:text-base uppercase font-medium tracking-widest text-foreground/60 whitespace-nowrap">
            ({project.category})
          </span>
        </div>
      </motion.div>
    </Link>
  );
};
