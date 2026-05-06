import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";

const HeroSection = () => {
  return (
    <section className="hero-bg min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Large heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 lg:mt-20"
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight">
            Digital{" "}
            <span className="text-primary">Marketing</span>
            <br />
            Modern{" "}
            <span className="inline-block align-middle mx-2">
              <img
                src={heroTeam}
                alt="Team"
                className="w-32 h-16 md:w-44 md:h-20 lg:w-56 lg:h-24 object-cover rounded-full inline-block"
                width={224}
                height={96}
              />
            </span>{" "}
            Agency
          </h1>
        </motion.div>

        {/* Rotating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-32 right-8 lg:right-32 hidden md:block"
        >
          <div className="relative w-36 h-36 lg:w-44 lg:h-44">
            <svg className="animate-spin-slow w-full h-full" viewBox="0 0 200 200">
              <defs>
                <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
              </defs>
              <text className="fill-foreground/70 text-[13px] tracking-[4px] uppercase" fontFamily="DM Sans">
                <textPath href="#circlePath">
                  CREATIVE MARKETING • DIGITAL AGENCY • SINCE 1919 •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-xl">B</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats + Description row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex flex-col lg:flex-row gap-10 lg:gap-20"
        >
          {/* Left stat */}
          <div className="flex-shrink-0">
            <div className="flex items-end gap-1">
              <span className="font-heading text-5xl md:text-6xl font-bold text-primary">56K</span>
            </div>
            <p className="text-foreground/80 text-sm mt-1">Happy Clients</p>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-secondary border-2 border-background overflow-hidden">
                    <div className="w-full h-full bg-muted" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-foreground/60 text-sm">4.8 Ratings</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-border/50 self-stretch" />

          {/* Description */}
          <div className="max-w-lg">
            <p className="text-foreground/70 text-sm leading-relaxed">
              At our Creative Digital Agency, we bring your ideas to life beach
              crafting engaging, impactful digital experiences that captivate
              audiences and drive results. From innovative.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-3 rounded-full text-sm transition-all group"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              Read More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
