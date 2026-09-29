import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import woleSoyinka from "@/assets/wole-soyinka.jpg";
import manEvent from "@/assets/man-event.jpg";
import isdbEvent from "@/assets/isdb-event.jpg";
import lontorPays from "@/assets/lontorpays.jpg";
import gacMotors from "@/assets/gac-motors.jpg";
import gacGs4 from "@/assets/gac-gs4.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import videoThumb from "@/assets/video-thumb.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import aboutTeam from "@/assets/about-team.jpg";

const portfolioItems = [
  { img: woleSoyinka, caption: "WOLE SOYINKA AT 90", span: "col-span-1 md:col-span-2 row-span-2" },
  { img: manEvent, caption: "MANUFACTURERS ASSOCIATION OF NIGERIA", span: "col-span-1 row-span-1" },
  { img: isdbEvent, caption: "IDEAS PEOPLE CULTURE CHANGE", span: "col-span-1 row-span-1" },
  { img: lontorPays, caption: "LONTORPAYS FINTECH", span: "col-span-1 md:col-span-2 row-span-1" },
  { img: gacMotors, caption: "STRATEGY CREATIVITY EXECUTION REAL IMPACT", span: "col-span-1 row-span-2" },
  { img: gacGs4, caption: "PEOPLE BRANDS COMMUNITIES FOR A BOLDER TOMORROW", span: "col-span-1 md:col-span-2 row-span-1" },
  // { img: project1, caption: "CREATIVE ECONOMY REAL PEOPLE BIGGER POSSIBILITIES", span: "col-span-1 row-span-1" },
  // { img: project2, caption: "GOOD STORIES STRONGER BRANDS BRIGHTER AFRICA", span: "col-span-1 md:col-span-2 row-span-1" },
  // { img: project3, caption: "CONVERSATIONS THAT MOVE CULTURE FORWARD", span: "col-span-1 row-span-1" },
  // { img: videoThumb, caption: "CINEMATIC FILM PRODUCTION", span: "col-span-1 row-span-1" },
  // { img: heroTeam, caption: "DYC CREATIVE ENGINE", span: "col-span-1 row-span-1" },
  // { img: aboutTeam, caption: "EXECUTIVE MEDIA HUB", span: "col-span-1 row-span-1" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 lg:py-36 bg-[#0A0A0A] text-white relative border-b border-neutral-800">
      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Frame Container with Corner Brackets */}
        <div className="relative border border-neutral-800 rounded-3xl p-6 sm:p-10 lg:p-14 bg-[#0F0F0F]">
          {/* Top-Left Corner Bracket */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#ED1C24]" />
          {/* Top-Right Corner Bracket */}
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#ED1C24]" />
          {/* Bottom-Left Corner Bracket */}
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#ED1C24]" />
          {/* Bottom-Right Corner Bracket */}
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#ED1C24]" />

          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#ED1C24]" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-body">
                SELECTED WORK - DEL-YORK COMMUNICATIONS
              </span>
            </div>

            <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              OUR <span className="text-[#ED1C24]">PORTFOLIO</span>
            </h2>

            <p className="mt-4 text-neutral-400 text-base md:text-lg font-body max-w-xl">
              A curated view of campaigns, platforms, films and experiences.
            </p>
          </div>

          {/* Masonry / Photo Collage Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`group relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 ${item.span}`}
              >
                <img
                  src={item.img}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                    {item.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 flex justify-center">
            <Link
              to="/works"
              className="px-10 py-4 rounded-xl border border-neutral-700 bg-black/60 hover:bg-[#ED1C24] hover:border-[#ED1C24] text-white font-heading font-bold text-lg uppercase tracking-widest transition-all duration-300 shadow-md"
            >
              LOAD MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

