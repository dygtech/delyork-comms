import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import eccoBg from "@/assets/redesign/ecco_offer_bg.jpg";
import eipBg from "@/assets/redesign/eip_offer_bg.jpg";

const WhatWeOfferSection = () => {
  return (
    <section id="strategy" className="py-24 lg:py-36 bg-[#080808] text-white border-b border-neutral-800 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#ED1C24]" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-body">
              TWO SYSTEMS. ONE COMMUNICATIONS PARTNER.
            </span>
          </div>

          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
            WHAT WE <span className="text-[#ED1C24]">OFFER</span>
          </h2>

          <p className="mt-4 text-neutral-400 text-base md:text-lg font-body max-w-2xl">
            Two flagship offers. One integrated approach to strengthen institutions and the leaders who represent them.
          </p>
        </div>

        {/* 2 Side-by-Side Offer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: ECCO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-[16/10] md:aspect-[16/9] flex flex-col justify-end p-8 md:p-12 cursor-pointer shadow-xl hover:border-neutral-700 transition-colors"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={eccoBg}
                alt="ECCO - Embedded Creative Communications Office"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Giant Watermark Text */}
            <div className="absolute top-4 left-6 z-10 pointer-events-none select-none">
              <span className="font-heading text-8xl md:text-[140px] font-extrabold text-white/10 uppercase tracking-tighter leading-none">
                ECCO
              </span>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-start gap-3">
              <h3 className="font-heading text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none group-hover:text-[#ED1C24] transition-colors">
                ECCO
              </h3>

              <span className="text-xs md:text-sm font-body font-bold uppercase tracking-widest text-neutral-300">
                EMBEDDED CREATIVE COMMUNICATIONS OFFICE
              </span>

              <p className="text-neutral-300 font-body text-sm md:text-base max-w-lg mt-2 leading-relaxed">
                A strategic and creative communications function embedded inside an organisation and managed by DYC.
              </p>

              <Link
                to="/about#strategic-portfolio"
                className="mt-6 inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-widest text-white group-hover:text-[#ED1C24] transition-colors"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: EIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-[16/10] md:aspect-[16/9] flex flex-col justify-end p-8 md:p-12 cursor-pointer shadow-xl hover:border-neutral-700 transition-colors"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={eipBg}
                alt="EIP - Executive Influence Programme"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Giant Watermark Text */}
            <div className="absolute top-4 left-6 z-10 pointer-events-none select-none">
              <span className="font-heading text-8xl md:text-[140px] font-extrabold text-white/10 uppercase tracking-tighter leading-none">
                EIP
              </span>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-start gap-3">
              <h3 className="font-heading text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none group-hover:text-[#ED1C24] transition-colors">
                EIP
              </h3>

              <span className="text-xs md:text-sm font-body font-bold uppercase tracking-widest text-neutral-300">
                EXECUTIVE INFLUENCE PROGRAMME
              </span>

              <p className="text-neutral-300 font-body text-sm md:text-base max-w-lg mt-2 leading-relaxed">
                A strategic positioning and reputation programme for leaders whose visibility must support a larger institutional agenda.
              </p>

              <Link
                to="/about#strategic-portfolio"
                className="mt-6 inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-widest text-white group-hover:text-[#ED1C24] transition-colors"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
