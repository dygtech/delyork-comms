import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EventsImg from "@/assets/01-events-and-execution-banner.webp";
import StratCommImg from "@/assets/02-strategic-communications-banner.webp";
import PartnershipImg from "@/assets/03-partnership-engagement-banner.webp";
import ProjectMgmtImg from "@/assets/04-project-management-banner.webp";
import BrandingImg from "@/assets/05-branding-banner.webp";
import VideoImg from "@/assets/06-video-production-banner.webp";

const services = [
  {
    id: "events",
    num: "01",
    title: "Experiential and Corporate Events",
    description: "Ministerial summits. Galas. Product launches. Exhibitions. Job fairs. We handle it end-to-end and make it look easy.",
    tags: ["Multi-day summits", "Gala dinners", "Exhibitions"],
    color: "#9B1D1D",
    image: EventsImg,
  },
  {
    id: "strat-comm",
    num: "02",
    title: "Creative Economy Communications",
    description: "Building Africa's Creative Future. This offering positions DYC as the communications leader for Africa's creative industries.",
    tags: ["Creative Economy Positioning", "Policy Advocacy", "Sector Branding"],
    color: "#1E5D48",
    image: StratCommImg,
    subServices: [
      { title: "Government and Institutional Communications", label: "Public sector" },
      { title: "Development Programme Communications", label: "Development" },
      { title: "Brand and Corporate PR", label: "Private sector" },
      { title: "Crisis and Reputation Management", label: "Always on" },
    ],
  },
  {
    id: "partnership",
    num: "03",
    title: "Partnership Engagement",
    description: "We broker. We convene. We connect institutions, government, private sector, and development partners around shared value.",
    tags: ["Sponsorships", "Stakeholder coord.", "Ecosystem mapping"],
    color: "#4F46B9",
    image: PartnershipImg,
  },
  {
    id: "project-mgmt",
    num: "04",
    title: "Project Management",
    description: "One point of accountability. Clear milestones. No coordination lag. We run the whole thing so nothing falls through the cracks.",
    tags: ["PMO delivery", "Vendor management", "Risk and reporting"],
    color: "#5D3F1E",
    image: ProjectMgmtImg,
  },
  {
    id: "branding",
    num: "05",
    title: "Branding",
    description: "A strong brand is how you show up. Consistency in voice. Clarity in purpose. Cohesion across every touchpoint.",
    tags: ["Brand Strategy", "Visual Identity", "Brand Architecture"],
    color: "#9B1D1D",
    image: BrandingImg,
  },
  {
    id: "video-production",
    num: "06",
    title: "Video Production",
    description: "From conceptualising the big idea to final cut. We script, shoot, edit, and deliver finished videos that bring ideas to life.",
    tags: ["Video Editing", "Videography", "Content Creation"],
    color: "#4F46B9",
    image: VideoImg,
  },
];

/* ─────────────────────────────── Modal ────────────────────────────────── */
const ServiceModal = ({
  service,
  onClose,
}: {
  service: (typeof services)[0];
  onClose: () => void;
}) => (
  <>
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
    />

    {/* Modal */}
    <motion.div
      layoutId={`modal-${service.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 lg:p-20 overflow-y-auto"
      style={{ backgroundColor: service.color }}
    >
      <motion.button
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
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
            {service.num} / Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-12"
          >
            {service.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-xl md:text-2xl leading-relaxed font-body mb-12"
          >
            {service.description}
            <br /><br />
            We don&apos;t just plan; we execute with precision. Every detail is considered, every variable accounted for, ensuring your story is told exactly how it needs to be.
          </motion.p>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-3xl overflow-hidden aspect-video border border-white/10"
          >
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </motion.div>

          {service.subServices ? (
            <div className="flex flex-col border-t border-white/10">
              {service.subServices.map((sub, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {service.tags.map((tag, i) => (
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
);

/* ──────────────────────────── Main Section ─────────────────────────────── */
const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<string>(services[0].id);
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  const activeService = services.find((s) => s.id === hoveredId) ?? services[0];

  return (
    <section id="services" className="relative py-24 lg:py-40 bg-background">
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-tight">
            Delivery Capabilities
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-body text-balance">
            The following services become delivery engines supporting our strategic products.
            Integrated into larger strategic engagements, not sold standalone.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* LEFT — Sticky image panel */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-28 shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-foreground/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Service number badge */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-mono px-3 py-1 rounded-full">
                {activeService.num}
              </div>
            </div>

            {/* CTA below image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Link
                to="/about#delivery-capabilities"
                className="group inline-flex items-center gap-3 border border-foreground/20 hover:border-foreground text-foreground/60 hover:text-foreground px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              >
                See all 16 capabilities
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Vertical service list */}
          <div className="w-full lg:w-[62%]">
            <p className="text-foreground/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 font-body">
              Our Services
            </p>

            <ul className="divide-y divide-foreground/10">
              {services.map((service, i) => {
                const isActive = hoveredId === service.id;
                return (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    onMouseEnter={() => setHoveredId(service.id)}
                    className="group cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-center justify-between py-5 md:py-6">
                      {/* Title */}
                      <span
                        className={`font-heading text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none transition-all duration-300 select-none ${
                          isActive
                            ? "font-black underline underline-offset-[6px] decoration-2 text-foreground"
                            : "font-light text-foreground/35"
                        }`}
                      >
                        {service.title}
                      </span>

                      {/* Arrow — slides in when row is active */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 ml-4"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/30 flex items-center justify-center bg-foreground text-background transition-colors duration-300">
                          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Full-screen modal (AnimatePresence preserved) ── */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
