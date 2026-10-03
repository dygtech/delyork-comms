import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfoliosQuery } from "@/services/queries";
import { getStrapiMedia } from "@/services/api";

import woleSoyinka from "@/assets/wole-soyinka.jpg";
import manEvent from "@/assets/man-event.jpg";
import isdbEvent from "@/assets/isdb-event.jpg";
import lontorPays from "@/assets/lontorpays.jpg";
import gacMotors from "@/assets/gac-motors.jpg";
import gacGs4 from "@/assets/gac-gs4.jpg";

interface PortfolioDisplayItem {
  img: string;
  caption: string;
  slug?: string;
  span: string;
}

const defaultPortfolioItems: PortfolioDisplayItem[] = [
  { img: woleSoyinka, caption: "WOLE SOYINKA AT 90", slug: "wole-soyinka-at-90", span: "col-span-1 md:col-span-2 row-span-2" },
  { img: manEvent, caption: "MANUFACTURERS ASSOCIATION OF NIGERIA", slug: "man-at-50", span: "col-span-1 row-span-1" },
  { img: isdbEvent, caption: "IDEAS PEOPLE CULTURE CHANGE", slug: "islamic-development-bank-annual-meeting", span: "col-span-1 row-span-1" },
  { img: lontorPays, caption: "LONTORPAYS FINTECH", slug: "lontor-pays", span: "col-span-1 md:col-span-2 row-span-1" },
  { img: gacMotors, caption: "STRATEGY CREATIVITY EXECUTION REAL IMPACT", slug: "gac-motors", span: "col-span-1 row-span-2" },
  { img: gacGs4, caption: "PEOPLE BRANDS COMMUNITIES FOR A BOLDER TOMORROW", slug: "gac-gs4-launch", span: "col-span-1 md:col-span-2 row-span-1" },
];

// Consistent masonry pattern sequence for items
const gridSpanPattern = [
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 md:col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 md:col-span-2 row-span-1",
];

const PortfolioSection = () => {
  const { data: serverPortfolios } = usePortfoliosQuery();

  const items: PortfolioDisplayItem[] =
    serverPortfolios && serverPortfolios.length > 0
      ? serverPortfolios.slice(0, 6).map((item, index) => {
        const coverImage = getStrapiMedia(item.cover_image?.url);
        const slug = item.slug || "";

        let fallbackImg = woleSoyinka;
        if (slug.includes("man")) fallbackImg = manEvent;
        else if (slug.includes("isdb") || slug.includes("islamic")) fallbackImg = isdbEvent;
        else if (slug.includes("lontor")) fallbackImg = lontorPays;
        else if (slug.includes("gac-motors")) fallbackImg = gacMotors;
        else if (slug.includes("gac-gs4")) fallbackImg = gacGs4;

        return {
          img: coverImage || fallbackImg,
          caption: item.title,
          slug: slug,
          span: gridSpanPattern[index % gridSpanPattern.length],
        };
      })
      : defaultPortfolioItems;

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
            {items.map((item, index) => {
              const cardContent = (
                <div className="relative w-full h-full">
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
                </div>
              );

              return (
                <motion.div
                  key={item.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className={`group relative overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 ${item.span}`}
                >
                  {item.slug ? (
                    <Link to={`/work/${item.slug}`} className="block w-full h-full">
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </motion.div>
              );
            })}
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

