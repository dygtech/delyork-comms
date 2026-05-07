import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center bg-background">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://delyorkcommunications.com/wp-content/uploads/2020/01/delyork-video.mp4" type="video/mp4" />
        </video>
        {/* Refined Overlay - more transparent to let the video through */}
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
            We find {" "}
            <span className="inline-block align-middle mx-2">
              <motion.img
                whileHover={{ scale: 1.1, rotate: -2 }}
                src={heroTeam}
                alt="Team"
                className="w-32 h-16 md:w-44 md:h-20 lg:w-56 lg:h-24 object-cover rounded-full inline-block cursor-pointer"
                width={224}
                height={96}
              />
            </span>{" "}
            the why.
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
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-xl">D</span>
              </div>
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

          {/* Divider */}
          <div className="hidden lg:block w-px bg-primary/20 h-32 self-center mx-4" />

          {/* Description */}
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-foreground/80 text-lg leading-relaxed font-body italic">
              "We tell stories that resonate. For brands, institutions, and governments that shape the future of Nigeria and sub-Saharan Africa."
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-bold transition-all hover:gap-5 shadow-xl shadow-primary/20"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-foreground px-8 py-4 rounded-full text-sm font-bold transition-all"
              >
                Our Showreel
              </a>
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
