import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-background overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, white 79px, white 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, white 79px, white 80px)",
        }}
      />

      {/* Large decorative word */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap">
        <span
          className="font-heading text-[20vw] font-bold uppercase leading-none text-outline"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          }}
        >
          DYC
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block text-xs uppercase tracking-[0.4em] font-bold text-primary mb-8"
          >
            About Del-York Communications
          </motion.span>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] uppercase mb-10 text-foreground">
            We don't{" "}
            <span className="text-primary">just</span>
            <br />
            communicate.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-foreground/60 font-body leading-relaxed max-w-3xl"
          >
            We shape perception, influence decisions and build the future. Africa's Strategic Communications, Influence and AI Creative Transformation Company.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex items-center gap-3 text-foreground/30"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
