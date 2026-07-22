import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Years delivering", value: 15, suffix: "+" },
  { label: "Media placements per campaign", value: 40, suffix: "+" },
  { label: "Group subsidiaries", value: 8, suffix: "" },
  { label: "Creative alumni network", value: 4, suffix: "K+" },
];

const Counter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="flex items-baseline">
        <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-none">
          {displayValue}
          <span className="text-3xl md:text-4xl lg:text-5xl">{suffix}</span>
        </span>
      </div>
      <p className="text-black/60 text-xs md:text-sm font-medium leading-tight max-w-[140px]">
        {label}
      </p>
    </div>
  );
};

const StatsNarrativeSection = () => {
  return (
    <section id="about" className="py-24 lg:py-40 bg-white text-black overflow-hidden border-y border-black/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div className="lg:w-7/12">
            {/* <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-black/40 mb-6 block"
            >
              At heart, we're...
            </motion.span> */}

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8 text-balance"
            >
              We shape perception, influence decisions and build the future.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-black/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-body"
            >
              <strong>Del-York Communications (DYC)</strong> is Africa's Strategic Communications, Influence and AI Creative Transformation Company. We help governments, institutions, corporations and leaders shape reputation, build influence, attract investment and drive transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <a href="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-black/60 hover:border-black/60 transition-colors">
                Discover Our Story 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 border-t border-black/10"
            >
              <p className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest font-semibold flex flex-wrap gap-x-4 gap-y-2">
                <span>Part of the Del-York Group</span>
                <span className="opacity-30">•</span>
                <span>15+ years in operation</span>
                <span className="opacity-30">•</span>
                <span>Lagos-based, Africa-focused</span>
              </p>
            </motion.div>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:w-5/12 w-full">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Counter {...stat} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsNarrativeSection;
