import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CapabilitiesImg from "@/assets/redesign/capabilities_control_room.jpg";
import EventsImg from "@/assets/01-events-and-execution-banner.webp";
import StratCommImg from "@/assets/02-strategic-communications-banner.webp";
import PartnershipImg from "@/assets/03-partnership-engagement-banner.webp";
import ProjectMgmtImg from "@/assets/04-project-management-banner.webp";
import BrandingImg from "@/assets/05-branding-banner.webp";
import VideoImg from "@/assets/06-video-production-banner.webp";

const services = [
  {
    id: "experiential-events",
    num: "01",
    title: "EXPERIENTIAL & CORPORATE EVENTS",
    description: "Ministerial summits. Galas. Product launches. Exhibitions. Job fairs. We handle it end-to-end and make it look easy.",
    tags: ["Multi-day summits", "Gala dinners", "Exhibitions"],
    color: "#18181B",
    image: EventsImg,
  },
  {
    id: "creative-economy",
    num: "02",
    title: "CREATIVE ECONOMY COMMUNICATIONS",
    description: "Building Africa's Creative Future. Positioning DYC as the communications leader for Africa's creative industries.",
    tags: ["Creative Economy Positioning", "Policy Advocacy", "Sector Branding"],
    color: "#18181B",
    image: CapabilitiesImg,
    subServices: [
      { title: "Government and Institutional Communications", label: "Public sector" },
      { title: "Development Programme Communications", label: "Development" },
      { title: "Brand and Corporate PR", label: "Private sector" },
      { title: "Crisis and Reputation Management", label: "Always on" },
    ],
  },
  {
    id: "partnership-engagement",
    num: "03",
    title: "PARTNERSHIP ENGAGEMENT",
    description: "We broker. We convene. We connect institutions, government, private sector, and development partners around shared value.",
    tags: ["Sponsorships", "Stakeholder coord.", "Ecosystem mapping"],
    color: "#18181B",
    image: PartnershipImg,
  },
  {
    id: "project-management",
    num: "04",
    title: "PROJECT MANAGEMENT",
    description: "One point of accountability. Clear milestones. No coordination lag. We run the whole thing so nothing falls through the cracks.",
    tags: ["PMO delivery", "Vendor management", "Risk and reporting"],
    color: "#18181B",
    image: ProjectMgmtImg,
  },
  {
    id: "branding",
    num: "05",
    title: "BRANDING",
    description: "A strong brand is how you show up. Consistency in voice. Clarity in purpose. Cohesion across every touchpoint.",
    tags: ["Brand Strategy", "Visual Identity", "Brand Architecture"],
    color: "#18181B",
    image: BrandingImg,
  },
  {
    id: "video-production",
    num: "06",
    title: "VIDEO PRODUCTION",
    description: "From conceptualising the big idea to final cut. We script, shoot, edit, and deliver finished videos that bring ideas to life.",
    tags: ["Video Editing", "Videography", "Content Creation"],
    color: "#18181B",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 lg:p-20 overflow-y-auto bg-[#121212] text-white"
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#ED1C24] flex items-center justify-center text-white z-[70] transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="container max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 text-white pt-16 pb-8">
        <div className="lg:w-1/2">
          <span className="text-xs uppercase tracking-widest text-[#ED1C24] font-bold mb-4 block font-body">
            {service.num} / DELIVERY CAPABILITIES
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6 leading-tight">
            {service.title}
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed font-body mb-8">
            {service.description}
          </p>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden aspect-video border border-neutral-800">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          <Link
            to="/about#delivery-capabilities"
            className="w-full py-4 rounded-xl bg-[#ED1C24] text-white font-heading font-bold text-center text-lg hover:bg-red-700 transition-colors uppercase tracking-wider"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  </>
);

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<string>(services[1].id);
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  const activeService = services.find((s) => s.id === hoveredId) ?? services[1];

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-[#080808] text-white border-b border-neutral-800">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold leading-tight uppercase tracking-tight">
            DELIVERY <span className="text-[#ED1C24]">CAPABILITIES</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-xl mt-4 font-body">
            From strategy to execution, these capabilities bring ideas to life across experiences, partnerships, brands and content.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* LEFT — Image panel */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-28 shrink-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Header tag indicator on image */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-body font-semibold px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-[#ED1C24]" />
                <span>OUR SERVICES</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Vertical service list */}
          <div className="w-full lg:w-[58%]">
            <ul className="divide-y divide-neutral-800 border-t border-b border-neutral-800">
              {services.map((service, i) => {
                const isActive = hoveredId === service.id;
                return (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onMouseEnter={() => setHoveredId(service.id)}
                    onClick={() => setSelectedService(service)}
                    className={`group cursor-pointer py-6 md:py-8 transition-colors ${
                      isActive ? "bg-white/5 px-4 rounded-xl" : "px-4"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-heading text-xl md:text-3xl lg:text-4xl font-bold uppercase transition-colors ${
                          isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      >
                        {service.title}
                      </span>

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? "bg-white text-black scale-100 opacity-100"
                            : "bg-neutral-800 text-neutral-400 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

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

