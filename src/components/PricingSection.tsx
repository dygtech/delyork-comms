import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk, Check } from "lucide-react";

const plans = [
  { name: "BASIC PLAN", price: "$19.00" },
  { name: "STANDARD PLAN", price: "$39.00" },
  { name: "PRO PLAN", price: "$199.00" },
];

const features = ["3 Regular Ads", "1 Featured Ad", "03 Top Ads", "30 Days Availability", "30 Days Availability", "30 Days Availability"];

const PricingSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest">Best Pricing</span>
            <Asterisk className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            The Best <span className="text-primary">Pricing</span> Plans
          </h2>
          <p className="text-foreground/60 text-sm mt-4 max-w-xl mx-auto">
            At our Creative Digital Agency, we bring your ideas to life beach crafting engaging impactful digital experiences that captivate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/30 hover:border-primary/50 transition-colors relative overflow-hidden"
            >
              <span className="text-foreground/50 text-xs tracking-widest uppercase">{plan.name}</span>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mt-2">{plan.price}</h3>
              <div className="h-px bg-border/40 my-6" />

              <ul className="space-y-4">
                {features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-foreground/70 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex items-center gap-2 mt-8 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-3 rounded-full text-sm transition-all group"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                Subscribe Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
