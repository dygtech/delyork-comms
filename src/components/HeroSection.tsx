import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";
import dyPreloader from '@/assets/dyc-logo.gif';
import landingHero from '@/assets/landing-page-hero.webp';

const HeroSection = () => {

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center bg-background">
      {/* Image Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={landingHero}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        {/* Refined Overlay - more transparent to let the image through */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        {/* Large heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 lg:mt-20"
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] tracking-tight">
            We are{" "}
            <span className="text-primary">Del-York.</span>
            <br />
            We find the why.
          </h1>
        </motion.div>

        {/* Rotating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-10 right-8 lg:right-10 hidden md:block"
        >
          <div className="relative w-36 h-36 lg:w-44 lg:h-44 bg-background/20 backdrop-blur-md rounded-full p-2 border border-white/5">
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
              <img src={dyPreloader} alt="dyc logo" className="w-18 h-18" />
            </div>
          </div>
        </motion.div>

        {/* Stats + Description row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start"
        >
          {/* Left stat */}
          <div className="flex-shrink-0 group cursor-default">
            <div className="flex items-end gap-1">
              <span className="font-heading text-5xl md:text-6xl font-bold text-primary transition-transform duration-500 group-hover:scale-110 block">500</span>
              <span className="font-heading text-3xl font-bold text-primary mb-2">+</span>
            </div>
            <p className="text-foreground/80 text-sm mt-1 uppercase tracking-widest font-medium">Projects Delivered</p>

            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background overflow-hidden cursor-pointer shadow-lg"
                  >
                    <div className="w-full h-full bg-primary/20 backdrop-blur-sm" />
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col ml-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-foreground/40 text-[10px] uppercase tracking-tighter mt-1 font-bold">Trusted by Global Brands</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Scroll Indicator - moved outside container to stay at bottom of section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
