import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { Asterisk, X, ArrowRight } from "lucide-react";
import EventsImg from "@/assets/01-events-and-execution-banner.webp";
import StratCommImg from "@/assets/02-strategic-communications-banner.webp";
import PartnershipImg from "@/assets/03-partnership-engagement-banner.webp";
import ProjectMgmtImg from "@/assets/04-project-management-banner.webp";

const services = [
  {
    id: "events",
    num: "01",
    title: "Events and Execution",
    description: "Ministerial summits. Galas. Product launches. Exhibitions. Job fairs. We handle it end-to-end and make it look easy.",
    tags: ["Multi-day summits", "Gala dinners", "Exhibitions"],
    color: "#9B1D1D", // Red
    image: EventsImg
  },
  {
    id: "strat-comm",
    num: "02",
    title: "Strategic Communications",
    description: "Narratives that hold up under pressure. Media relations, executive messaging, digital strategy, reputation management.",
    tags: ["Media relations", "PR", "Reputation mgmt"],
    color: "#1E5D48", // Green
    image: StratCommImg,
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
    image: PartnershipImg,
  },
  {
    id: "project-mgmt",
    num: "04",
    title: "Project Management",
    description: "One point of accountability. Clear milestones. No coordination lag. We run the whole thing so nothing falls through the cracks.",
    tags: ["PMO delivery", "Vendor management", "Risk and reporting"],
    color: "#5D3F1E", // Brown
    image: ProjectMgmtImg,
  },
];

const ServiceCard = ({
  service,
  index,
  progress,
  range,
  targetScale,
  onClick
}: {
  service: typeof services[0];
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  onClick: () => void;
}) => {
  const cardRef = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={cardRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        layoutId={`card-${service.id}`}
        style={{ scale, top: `calc(-5% + ${index * 25}px)`, backgroundColor: service.color }}
        onClick={onClick}
        className="relative h-[450px] md:h-[500px] w-full rounded-3xl overflow-hidden origin-top border border-white/5 shadow-2xl cursor-pointer group"
      >
        {/* Mobile: Image on top / Desktop: Text left, Image right */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row h-full text-white">
          {/* Text Content - 60% width on desktop */}
          <div className="md:w-[60%] flex flex-col justify-center px-8 pb-8 pt-6 md:p-12">
            <span className="text-sm font-mono opacity-60 mb-6 md:mb-8 block">{service.num}</span>
            <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-500 max-w-2xl leading-none">
              {service.title}
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl font-body mb-auto">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6 md:mt-8">
              {service.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/20 text-xs font-medium backdrop-blur-sm bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image - 40% width on desktop, full bleed no padding */}
          <div className="md:w-[40%] relative h-[200px] md:h-full overflow-hidden shrink-0">
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Arrow button - absolute positioned on card */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
          <motion.div
            whileHover={{ scale: 1.1, x: 5 }}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedService]);

  return (
    <section id="services" ref={container} className="relative py-24 lg:py-40 bg-background">
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

        {/* Sticky Cards List */}
        <div className="relative">
          {services.map((service, i) => {
            const targetScale = 1 - ((services.length - i) * 0.05);
            return (
              <ServiceCard
                key={service.id}
                index={i}
                service={service}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                onClick={() => setSelectedService(service)}
              />
            );
          })}
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

                  {/* Render Sub-services if they exist */}
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
