import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedPortfoliosQuery } from "@/services/queries";
import { getStrapiMedia } from "@/services/api";

import questBrighterTomorrow from "@/assets/redesign/quest_brighter_tomorrow.jpg";
import questPeopleInMotion from "@/assets/redesign/quest_people_in_motion.jpg";
import questBuiltForMore from "@/assets/redesign/quest_built_for_more.jpg";
import questRootedInPeople from "@/assets/redesign/quest_rooted_in_people.jpg";

interface QuestItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  link: string;
}

const defaultQuests: QuestItem[] = [
  {
    id: "brighter-tomorrow",
    tag: "BRAND CAMPAIGN",
    title: "A BRIGHTER TOMORROW",
    image: questBrighterTomorrow,
    link: "/works/wole-soyinka-at-90",
  },
  {
    id: "people-in-motion",
    tag: "FILM PRODUCTION",
    title: "PEOPLE IN MOTION",
    image: questPeopleInMotion,
    link: "/works/manufacturers-association-of-nigeria",
  },
  {
    id: "built-for-more",
    tag: "PRODUCT STORY",
    title: "BUILT FOR MORE",
    image: questBuiltForMore,
    link: "/works/gac-motors",
  },
  {
    id: "rooted-in-people",
    tag: "STORYTELLING",
    title: "ROOTED IN PEOPLE",
    image: questRootedInPeople,
    link: "/works/islamic-development-bank-group",
  },
];

const LatestQuestsSection = () => {
  const { data: featuredPortfolios } = useFeaturedPortfoliosQuery();

  // Use featured portfolios from backend if available, otherwise fall back to hardcoded defaults
  const quests: QuestItem[] =
    featuredPortfolios && featuredPortfolios.length > 0
      ? featuredPortfolios.map((item) => ({
          id: item.slug || item.documentId,
          tag: item.featured_tag || item.capabilities?.[0]?.name?.toUpperCase() || "FEATURED",
          title: item.title.toUpperCase(),
          image: getStrapiMedia(item.cover_image?.url) || questBrighterTomorrow,
          link: `/works/${item.slug}`,
        }))
      : defaultQuests;

  return (
    <section className="py-20 lg:py-32 bg-[#0C0C0C] text-white border-b border-neutral-800">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#ED1C24]" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-body">
                SELECTED WORK
              </span>
            </div>

            <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
              LATEST <span className="text-[#ED1C24]">QUESTS</span>
            </h2>

            <p className="mt-4 text-neutral-400 text-base md:text-lg font-body max-w-xl">
              Recent work that shows how strategy becomes culture, conversation and measurable impact.
            </p>
          </div>

          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700 hover:border-white text-xs md:text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white transition-all group self-start md:self-end"
          >
            VIEW ALL WORK
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between aspect-[3/4] cursor-pointer shadow-lg hover:border-neutral-600 transition-colors"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={quest.image}
                  alt={quest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 transition-colors" />
              </div>

              {/* Card Header (Tag) */}
              <div className="relative z-10 p-6">
                <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-neutral-300 font-body">
                  {quest.tag}
                </span>
              </div>

              {/* Card Footer (Title + Arrow Button) */}
              <div className="relative z-10 p-6 flex items-end justify-between gap-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-white leading-none group-hover:text-[#ED1C24] transition-colors">
                  {quest.title}
                </h3>

                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-black/40 group-hover:bg-[#ED1C24] group-hover:border-[#ED1C24] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <Link to={quest.link} className="absolute inset-0 z-20" aria-label={quest.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestQuestsSection;
