import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk, Briefcase, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobListingsQuery } from "@/services/queries";

const defaultJobs = [
  {
    id: 1,
    title: "Senior Communications Strategist",
    department: "Strategy",
    location: "Lagos, Nigeria",
    type: "Full-time",
    slug: "senior-communications-strategist",
  },
  {
    id: 2,
    title: "Event Production Manager",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    slug: "event-production-manager",
  },
  {
    id: 3,
    title: "Public Relations Executive",
    department: "PR & Media",
    location: "Hybrid",
    type: "Full-time",
    slug: "public-relations-executive",
  },
];

const CareersSection = () => {
  const { data: serverJobs } = useJobListingsQuery();

  const jobs =
    serverJobs && serverJobs.length > 0
      ? serverJobs.slice(0, 3).map((j: any) => ({
          id: j.id,
          title: j.title,
          department: j.department || "—",
          location: j.location || "Lagos, Nigeria",
          type: j.employment_type || "Full-time",
          slug: j.slug || String(j.id),
        }))
      : defaultJobs;

  return (
    <section id="careers" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px,transparent 1px),linear-gradient(to right,hsl(var(--border)) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
          <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">
            Join The Team
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-xl"
          >
            Build The Future{" "}
            <span className="text-primary">Of Storytelling</span> With Us.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group font-medium"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              See All Openings
            </Link>
          </motion.div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                to={`/careers#${job.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/30 hover:border-primary/40 px-6 py-6 transition-all duration-300 hover:bg-card/80"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {job.title}
                    </h3>
                    <span className="text-foreground/50 text-xs uppercase tracking-widest font-mono">
                      {job.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-8 pl-14 sm:pl-0">
                  <div className="flex items-center gap-2 text-foreground/50 text-xs font-body">
                    <MapPin className="w-3.5 h-3.5 text-primary/60" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/50 text-xs font-body">
                    <Clock className="w-3.5 h-3.5 text-primary/60" />
                    {job.type}
                  </div>
                  <div className="hidden sm:flex w-9 h-9 rounded-full bg-background border border-border/30 group-hover:bg-primary group-hover:border-primary items-center justify-center ml-4 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-foreground/60 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-6 border-t border-border/10 pt-8"
        >
          <p className="text-foreground/40 text-sm font-body">
            We're a team of communicators, creators, and strategists — always looking for exceptional talent.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersSection;
