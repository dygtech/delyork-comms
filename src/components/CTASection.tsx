import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-2xl">👋</span>
          <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-body ml-2 uppercase tracking-widest">
            Hello!
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold mt-6 uppercase tracking-tight"
        >
          Let's Work Together!
        </motion.h2>
      </div>
    </section>
  );
};

export default CTASection;
