import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Asterisk } from "lucide-react";
import { Link } from "react-router-dom";

// The 7 flagship products from the document
const products = [
  {
    num: "01",
    title: "Embedded Creative Office",
    description: "Your Communications Department. Built by DYC. A fully managed, outsourced marketing and communications department functioning as an extension of your organization.",
    tags: ["Banks & Financial", "Government", "Large Corporations"],
    color: "#0F172A", // Dark Slate
  },
  {
    num: "02",
    title: "AI Creative Operations Office",
    description: "AI-Powered Creative Transformation. An AI-enabled communications system that helps organizations create content faster and scale creative output.",
    tags: ["Enterprise Marketing", "Creative Businesses", "Government"],
    color: "#312E81", // Indigo
  },
  {
    num: "03",
    title: "Executive Influence Office",
    description: "Building Leaders Who Shape Industries. A leadership positioning programme that builds visibility, credibility and influence for senior executives.",
    tags: ["CEOs", "Ministers & Governors", "Founders"],
    color: "#831843", // Pink/Rose dark
  },
  {
    num: "04",
    title: "Government Communications Office",
    description: "Strategic Communications for Public Institutions. A dedicated communications office supporting governments with policy communication and citizen engagement.",
    tags: ["Federal Ministries", "State Governments", "Public Institutions"],
    color: "#14532D", // Green dark
  },
  {
    num: "05",
    title: "Investment Attraction Communications",
    description: "Positioning Places for Growth. A strategic solution helping governments and cities attract domestic and international investment through compelling narratives.",
    tags: ["Investment Agencies", "Economic Boards", "Free Trade Zones"],
    color: "#78350F", // Amber/Brown dark
  },
  {
    num: "06",
    title: "Creative Economy Communications",
    description: "Accelerating Africa's Creative Economy. A specialist offering that positions Africa's creative industries for policy support, investment and sustainable growth.",
    tags: ["Film Industry", "Tourism Boards", "Cultural Institutions"],
    color: "#4C1D95", // Violet dark
  },
  {
    num: "07",
    title: "Crisis War Room",
    description: "Strategic Communications Under Pressure. A rapid-response command centre that protects reputation and supports executive decision-making during crises.",
    tags: ["Corporations", "Regulated Industries", "Public Figures"],
    color: "#7F1D1D", // Red dark
  },
];

const WhatWeDoSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="py-24 lg:py-40 bg-neutral-100 dark:bg-neutral-900 border-y border-black/5">
      <div className="container mx-auto px-6 md:px-12">

        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 uppercase text-black dark:text-white leading-[1.1] text-center md:text-left">
            What We Do
          </h2>

          <p className="text-xl md:text-3xl text-black/70 dark:text-white/70 mb-16 font-body leading-relaxed text-balance text-center md:text-left">
            Rather than providing isolated communications services, Del-York Communications designs, builds and operates integrated communication systems for organizations that cannot afford to look small, sound uncertain or move slowly.
          </p>

          <div className="bg-white dark:bg-black/20 p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-black/5 shadow-sm mb-12">
            <p className="text-2xl md:text-3xl font-heading font-bold mb-12 text-center md:text-left text-black/70 dark:text-white/70">We help our clients:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "Shape and protect their reputation.",
                "Build influence across key stakeholders.",
                "Attract investment and strategic partnerships.",
                "Strengthen executive visibility and thought leadership.",
                "Communicate transformation with clarity.",
                "Navigate crises and protect organizational trust.",
                "Build sustainable in-house creative capability.",
                "Convert attention into measurable outcomes."
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-lg md:text-xl text-black/80 dark:text-white/80 font-body leading-tight pt-1">{item}</span>
                </motion.div>
              ))}
            </div>
            {/* CTA to About Page — Strategic Portfolio section */}
            <div className="mt-12 flex justify-center md:justify-start">
              <Link to="/about#strategic-portfolio" className="group inline-flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black px-8 py-5 rounded-full font-semibold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300">
                Explore Our Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
