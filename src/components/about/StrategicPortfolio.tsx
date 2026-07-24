import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Asterisk, ChevronDown, ArrowRight } from "lucide-react";

const products = [
  {
    num: "01",
    title: "Embedded Creative Office",
    tagline: "Your Communications Department. Built by DYC.",
    description:
      "A fully managed, outsourced marketing and communications department that functions as an extension of the client's organization — with DYC's team embedded within their operations to handle day-to-day communications needs.",
    idealFor: ["Banks & Financial Institutions", "Large Corporations", "Government Agencies", "Multinationals in Africa"],
    deliverables: [
      "Dedicated communications team",
      "Brand management & content calendar",
      "Media relations & PR",
      "Internal communications",
      "Stakeholder engagement",
      "Digital & social media management",
      "Creative production support",
    ],
    color: "from-slate-900 to-slate-800",
    accent: "#3B82F6",
  },
  {
    num: "02",
    title: "AI Creative Operations Office",
    tagline: "AI-Powered Creative Transformation.",
    description:
      "An AI-enabled communications system that helps organizations create content faster, smarter and at scale — transforming how they produce, manage and distribute creative assets without proportionally increasing headcount.",
    idealFor: ["Enterprise Marketing Teams", "Creative Businesses", "Government Agencies", "Media Companies"],
    deliverables: [
      "AI workflow design & implementation",
      "Scalable content production systems",
      "AI-generated content with brand voice",
      "Creative capacity training",
      "Technology integration & support",
      "Performance analytics",
    ],
    color: "from-indigo-950 to-indigo-900",
    accent: "#818CF8",
  },
  {
    num: "03",
    title: "Executive Influence Office",
    tagline: "Building Leaders Who Shape Industries.",
    description:
      "A leadership positioning programme that builds visibility, credibility and influence for senior executives — turning leaders into recognized voices, trusted authorities and powerful advocates for their organizations.",
    idealFor: ["CEOs & Managing Directors", "Ministers & Governors", "Founders & Entrepreneurs", "Board Members"],
    deliverables: [
      "Personal brand strategy",
      "Thought leadership content",
      "Media training & positioning",
      "Speaking & conference strategy",
      "LinkedIn & digital presence management",
      "Book & publication support",
      "Awards & recognition strategy",
    ],
    color: "from-rose-950 to-rose-900",
    accent: "#FB7185",
  },
  {
    num: "04",
    title: "Government Communications Office",
    tagline: "Strategic Communications for Public Institutions.",
    description:
      "A dedicated communications office embedded within or supporting government ministries, departments and agencies — managing policy communication, citizen engagement and public narrative.",
    idealFor: ["Federal Ministries & Agencies", "State Governments", "Public Institutions", "International Organizations"],
    deliverables: [
      "Policy communication strategy",
      "Citizen engagement campaigns",
      "Government media relations",
      "Crisis & issues management",
      "Digital governance communications",
      "Stakeholder & diplomat engagement",
    ],
    color: "from-emerald-950 to-emerald-900",
    accent: "#34D399",
  },
  {
    num: "05",
    title: "Investment Attraction Communications",
    tagline: "Positioning Places for Growth.",
    description:
      "A strategic communications solution that helps governments, economic development agencies and cities attract domestic and international investment through compelling narratives, investor engagement and strategic positioning.",
    idealFor: ["Investment Promotion Agencies", "Economic Development Boards", "Free Trade Zones", "State Governments"],
    deliverables: [
      "Investment narrative & pitch decks",
      "Investor relations content",
      "Country & city branding",
      "Conference & roadshow support",
      "Media & PR for investment attraction",
      "Digital investor engagement",
    ],
    color: "from-amber-950 to-amber-900",
    accent: "#FBBF24",
  },
  {
    num: "06",
    title: "Creative Economy Communications",
    tagline: "Accelerating Africa's Creative Economy.",
    description:
      "A specialist communications offering that positions Africa's creative industries — film, music, fashion, gaming, tourism and arts — for global attention, policy support, investment and sustainable growth.",
    idealFor: ["Film & Entertainment Industry", "Tourism Boards", "Cultural Institutions", "Creative Sector Investors"],
    deliverables: [
      "Industry positioning & advocacy",
      "Festival & event communications",
      "Policy engagement & lobbying support",
      "International media relations",
      "Creative sector branding",
      "Talent & IP communications",
    ],
    color: "from-violet-950 to-violet-900",
    accent: "#A78BFA",
  },
  {
    num: "07",
    title: "Crisis War Room",
    tagline: "Strategic Communications Under Pressure.",
    description:
      "A rapid-response crisis management command centre that protects reputation, stabilizes stakeholder confidence and supports executive decision-making during high-stakes communications crises.",
    idealFor: ["Corporations Under Scrutiny", "Regulated Industries", "Public Figures", "Governments in Crisis"],
    deliverables: [
      "24/7 crisis command support",
      "Rapid-response messaging",
      "Media management & monitoring",
      "Stakeholder communications",
      "Internal crisis communications",
      "Reputation recovery strategy",
      "Post-crisis audit & rebuild",
    ],
    color: "from-red-950 to-red-900",
    accent: "#F87171",
  },
];

const StrategicPortfolio = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="strategic-portfolio" className="py-24 lg:py-40 bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/50 text-sm uppercase tracking-widest font-body font-semibold">
              Our Strategic Product Portfolio
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-[1.0] text-foreground">
            7 Flagship <br /><span className="text-primary">Solutions</span>
          </h2>
          <p className="text-foreground/60 mt-6 text-xl font-body leading-relaxed max-w-2xl">
            Each product is a fully operationalized communications system, designed for a specific strategic need.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {products.map((product, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                  isOpen ? "border-white/15 bg-white/[0.06]" : "border-white/8 bg-white/[0.02]"
                }`}
              >
                {/* Accordion Header */}
                <button
                  id={`product-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 px-8 py-7 text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="font-heading text-2xl font-bold shrink-0 transition-colors duration-300"
                      style={{ color: isOpen ? product.accent : "rgba(255,255,255,0.2)" }}
                    >
                      {product.num}
                    </span>
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-foreground/40 text-sm font-body mt-1">{product.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-foreground/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-10 border-t border-white/8 pt-8">
                        {/* Description */}
                        <div className="lg:col-span-1">
                          <p className="text-foreground/70 font-body leading-relaxed text-base">{product.description}</p>
                        </div>

                        {/* Ideal For */}
                        <div>
                          <p
                            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
                            style={{ color: product.accent }}
                          >
                            Ideal For
                          </p>
                          <ul className="space-y-2">
                            {product.idealFor.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-foreground/60 font-body text-sm">
                                <ArrowRight className="w-3 h-3 shrink-0" style={{ color: product.accent }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Core Deliverables */}
                        <div>
                          <p
                            className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4"
                            style={{ color: product.accent }}
                          >
                            Core Deliverables
                          </p>
                          <ul className="space-y-2">
                            {product.deliverables.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-foreground/60 font-body text-sm">
                                <div
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: product.accent }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StrategicPortfolio;
