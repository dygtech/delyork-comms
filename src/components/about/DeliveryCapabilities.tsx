import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const capabilities = [
  "Strategic Communications",
  "Public Relations",
  "Media Relations",
  "Content Strategy & Production",
  "Brand Strategy & Management",
  "Digital & Social Media Management",
  "Executive Communications",
  "Crisis Communications",
  "Stakeholder Engagement",
  "Internal Communications",
  "Investor Relations Communications",
  "Policy Communications",
  "Event & Experiential Communications",
  "AI Content Systems & Automation",
  "Media Monitoring & Analytics",
  "Training & Capacity Building",
];

const DeliveryCapabilities = () => {
  return (
    <section id="delivery-capabilities" className="py-24 lg:py-40 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-black/50 text-sm uppercase tracking-widest font-body font-semibold">
              Delivery Capabilities
            </span>
            <Asterisk className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-[1.0] text-black">
            16 Supporting
            <br />
            <span className="text-primary">Delivery Engines</span>
          </h2>
          <p className="text-black/60 mt-6 text-xl font-body leading-relaxed">
            Every engagement is powered by a full-stack of communications capabilities, deployed as needed and integrated into a unified system.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (index % 4) * 0.06 }}
              className="group relative bg-neutral-50 hover:bg-black rounded-2xl p-7 border border-black/5 hover:border-transparent transition-all duration-400 cursor-default overflow-hidden"
            >
              {/* Background number */}
              <span className="absolute bottom-3 right-4 font-heading text-7xl font-bold text-black/[0.04] group-hover:text-white/5 transition-colors select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-primary/20 flex items-center justify-center mb-5 transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <p className="text-black group-hover:text-white font-body font-semibold text-base leading-snug transition-colors duration-300 relative z-10">
                {capability}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryCapabilities;
