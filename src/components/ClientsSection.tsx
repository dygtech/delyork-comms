import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const brands = ["Kello", "Marbex", "Jakson", "neeon", "Carbon", "SAMSON", "Waston", "espenso"];

const ClientsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest">Our Clients</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Worked with World{" "}
            <span className="text-primary italic">Top Largest</span> Brands
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-2xl py-8 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="font-heading text-xl md:text-2xl font-bold text-foreground/50 hover:text-foreground transition-colors">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
