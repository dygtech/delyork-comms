import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk } from "lucide-react";
import serviceImg from "@/assets/service-img.jpg";

const services = [
  { num: "01", title: "Product Design" },
  { num: "02", title: "Branding And Identity" },
  { num: "03", title: "Marketing Strategy" },
  { num: "04", title: "Social Media Agency" },
];

const ServicesSection = () => {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest">Service we offer</span>
            <Asterisk className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Crafting <span className="text-primary">Digital</span> Excellence
          </h2>
          <p className="text-foreground/60 text-sm mt-4 max-w-xl mx-auto">
            At our Creative Digital Agency, we bring your ideas to life beach crafting engaging
            impactful digital experiences that captivate
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-t border-border/40"
            >
              <button
                onClick={() => setOpen(open === idx ? -1 : idx)}
                className="w-full flex items-center justify-between py-6 hover:text-primary transition-colors"
              >
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-left">
                  {service.num}. {service.title}
                </h3>
                <motion.span
                  animate={{ rotate: open === idx ? 45 : 0 }}
                  className="text-2xl text-primary"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 flex flex-col md:flex-row gap-6">
                      <img
                        src={serviceImg}
                        alt={service.title}
                        className="w-full md:w-48 h-40 object-cover rounded-xl"
                        loading="lazy"
                        width={192}
                        height={160}
                      />
                      <div>
                        <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                          Our Creative Digital Agency, We Bring Your Ideas To Life Beach Crafting Engaging, Hat Captivate
                          Determine Departure Explained No Forfeited He Something
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-foreground/70 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Creative Digital Agency, We Bring Your Ideas
                          </li>
                          <li className="flex items-center gap-2 text-foreground/70 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            To Life Beach Crafting Engaging
                          </li>
                          <li className="flex items-center gap-2 text-foreground/70 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Creative Digital Agency, We Bring Your Ideas
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="border-t border-border/40" />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 rounded-full text-sm transition-all group"
          >
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
              ↗
            </span>
            Explore Our All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
