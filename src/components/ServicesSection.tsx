import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk, X, ArrowRight } from "lucide-react";

const services = [
  {
    id: "events",
    num: "01",
    title: "Events and Execution",
    description: "Ministerial summits. Galas. Product launches. Exhibitions. Job fairs. We handle it end-to-end and make it look easy.",
    tags: ["Multi-day summits", "Gala dinners", "Exhibitions"],
    color: "#9B1D1D", // Red
  },
  {
    id: "strat-comm",
    num: "02",
    title: "Strategic Communications",
    description: "Narratives that hold up under pressure. Media relations, executive messaging, digital strategy, reputation management.",
    tags: ["Media relations", "PR", "Reputation mgmt"],
    color: "#1E5D48", // Green
    subServices: [
      { title: "Government and Institutional Communications", label: "Public sector" },
      { title: "Development Programme Communications", label: "Development" },
      { title: "Brand and Corporate PR", label: "Private sector" },
      { title: "Crisis and Reputation Management", label: "Always on" },
    ]
  },
  {
    id: "partnership",
    num: "03",
    title: "Partnership Engagement",
    description: "We broker. We convene. We connect institutions, government, private sector, and development partners around shared value.",
    tags: ["Sponsorships", "Stakeholder coord.", "Ecosystem mapping"],
    color: "#4F46B9", // Purple
  },
  {
    id: "project-mgmt",
    num: "04",
    title: "Project Management",
    description: "One point of accountability. Clear milestones. No coordination lag. We run the whole thing so nothing falls through the cracks.",
    tags: ["PMO delivery", "Vendor management", "Risk and reporting"],
    color: "#5D3F1E", // Brown
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedService]);

  return (
    <section className="py-24 lg:py-40 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest font-body font-semibold">Our Expertise</span>
            <Asterisk className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Four <span className="text-primary">things</span> we do.
            <br />
            One team that <span className="text-primary italic">delivers.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-body">
            We're a team of problem-solvers, storytellers, and innovators united by a simple mission:
            to create work that matters, work that moves the needle.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              layoutId={`card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl min-h-[400px] flex flex-col p-8 lg:p-12"
              style={{ backgroundColor: service.color }}
            >
              <div className="relative z-10 flex flex-col h-full text-white">
                <span className="text-sm font-body opacity-60 mb-8">{service.num}</span>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-md font-body mb-auto">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-12">
                  {service.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-4 py-2 rounded-full border border-white/20 text-xs font-medium backdrop-blur-sm bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12">
                  <motion.div 
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Bleed Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              layoutId={`card-${selectedService.id}`}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 lg:p-20 overflow-y-auto"
              style={{ backgroundColor: selectedService.color }}
            >
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 lg:top-12 lg:right-12 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl flex items-center justify-center text-white z-[70] transition-colors"
              >
                <X className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.button>

              <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 text-white relative z-10 pt-20 pb-12 lg:py-0">
                <div className="lg:w-1/2">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-body opacity-60 mb-8 block"
                  >
                    {selectedService.num} / Our Services
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-12"
                  >
                    {selectedService.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 text-xl md:text-2xl leading-relaxed font-body mb-12"
                  >
                    {selectedService.description}
                    <br /><br />
                    We don't just plan; we execute with precision. Every detail is considered, every variable accounted for, ensuring your story is told exactly how it needs to be.
                  </motion.p>
                </div>

                <div className="lg:w-1/2 flex flex-col gap-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-3xl overflow-hidden aspect-video bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                  >
                    <Asterisk className="w-24 h-24 text-white/10 animate-spin-slow" />
                  </motion.div>

                  {/* Render Sub-services if they exist (from the new image) */}
                  {selectedService.subServices ? (
                    <div className="flex flex-col border-t border-white/10">
                      {selectedService.subServices.map((sub, i) => (
                        <motion.div
                          key={sub.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex items-center justify-between py-6 border-b border-white/10 group/sub cursor-pointer"
                        >
                          <span className="font-heading text-lg md:text-xl font-bold group-hover/sub:translate-x-2 transition-transform duration-300">
                            {sub.title}
                          </span>
                          <div className="flex items-center gap-6">
                            <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold hidden sm:block">
                              {sub.label}
                            </span>
                            <ArrowRight className="w-5 h-5 opacity-40 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Fallback to tags grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {selectedService.tags.map((tag, i) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                          <h4 className="font-heading text-lg font-bold mb-2">{tag}</h4>
                          <p className="text-white/60 text-sm font-body">
                            Specialized solutions tailored to your unique organizational goals and audience needs.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full py-6 rounded-2xl bg-white text-black font-heading font-bold text-xl hover:bg-black hover:text-white transition-colors duration-500 shadow-xl"
                  >
                    Work With Us
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
