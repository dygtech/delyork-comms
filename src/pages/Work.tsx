import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Asterisk, Calendar, Users, Briefcase } from "lucide-react";
import { usePortfolioBySlugQuery, usePortfoliosQuery } from "@/services/queries";
import { BACKEND_URL } from "@/services/api";
import Navbar from "@/components/Navbar";

import wole_soyinka from "@/assets/wole-soyinka.jpg";
import man_event from "@/assets/man-event.jpg";
import isdb_event from "@/assets/isdb-event.jpg";
import lontorpays from "@/assets/lontorpays.jpg";
import gac_motors from "@/assets/gac-motors.jpg";
import gac_gs4 from "@/assets/gac-gs4.jpg";

// Detailed fallbacks to ensure offline resilience
const fallbackProjects: Record<string, any> = {
  "wole-soyinka-at-90": {
    title: "Wole Soyinka at 90",
    client: "Wole Soyinka Foundation",
    category: "Communications",
    overview: "A historic, multi-layered celebratory campaign honoring the life, philosophy, and creative literature of Africa's first Nobel Laureate in Literature.",
    team: "DEL-YORK Corporate Communications & Brand Strategy Team",
    img: wole_soyinka,
    content: `
      <h2>The Vision</h2>
      <p>Our objective was to celebrate a living legend by creating a narrative arc that combined traditional print media with cutting-edge visual projection displays across historical monuments.</p>
      <blockquote>"Art is the first line of human resistance against oppression."</blockquote>
      <p>Through our dedicated event management and communications strategy, we engaged millions of young Nigerians, inviting them to re-discover Soyinka's masterworks.</p>
    `
  },
  "manufacturers-association-of-nigeria": {
    title: "Manufacturers Association of Nigeria",
    client: "MAN Executive Council",
    category: "Event Management",
    overview: "Orchestrating the premier industrial and manufacturing summit in West Africa, driving conversation around sustainable manufacturing and policy formulation.",
    team: "DEL-YORK Experiential Marketing & Production Engine",
    img: man_event,
    content: `
      <h2>Industrial Transformation</h2>
      <p>We were tasked with designing a hybrid visual platform that could host high-level governmental delegates, industrial tycoons, and international trade speakers.</p>
      <blockquote>"Cooperation and innovation are the dual pillars of modern manufacturing."</blockquote>
      <p>Our production team crafted a multi-stage arena featuring real-time translation streams, automated seat allocation mapping, and an immersive digital archive showcasing decades of MAN contributions to local commerce.</p>
    `
  },
  "islamic-development-bank-group": {
    title: "Islamic Development Bank Group (IsDB Group)",
    client: "IsDB Regional Hub",
    category: "Campaign",
    overview: "Designing a comprehensive strategic communication and campaign pipeline to highlight key infrastructure funding and poverty alleviation programs across emerging economies.",
    team: "DEL-YORK Global Relations & Strategic PR Branch",
    img: isdb_event,
    content: `
      <h2>Empowering Communities</h2>
      <p>Through visual storytelling and localized PR placements, we helped translate complex fiscal metrics into human-centric success stories across major national publications.</p>
      <blockquote>"Building a sustainable future requires direct capital injection into local potential."</blockquote>
      <p>Our campaign deployed key interactive case study portals, high-definition mini-documentaries, and a structured media bridge linking international investors with localized developmental projects.</p>
    `
  },
  "lontorpays": {
    title: "Lontorpays",
    client: "Lontor Group",
    category: "Web & Mobile",
    overview: "Engineering an immersive digital product experience and modern interface architecture for Lontor's fintech payment ecosystem.",
    team: "DEL-YORK Product & Engineering Division",
    img: lontorpays,
    content: `
      <h2>Seamless Fintech Transactions</h2>
      <p>We designed a visual-first transaction workflow focusing heavily on reducing churn rates among retail consumers who purchase household appliances in installments.</p>
      <blockquote>"Technology is at its best when it removes friction from survival."</blockquote>
      <p>The resulting app features deep glassmorphic interface highlights, custom micro-animations for transaction success feedback, and a unified merchant rewards dashboard.</p>
    `
  },
  "gac-motors": {
    title: "GAC Motors",
    client: "CIG Motors Co.",
    category: "Print",
    overview: "Showcasing the absolute pinnacle of automotive luxury and design innovation through bold, cinematic corporate print media campaigns.",
    team: "DEL-YORK Creative Design & Styling Labs",
    img: gac_motors,
    content: `
      <h2>Cinematic Automotive Advertising</h2>
      <p>Our task was to visually position GAC's premium SUV range as the definitive status symbol for contemporary business leaders across West Africa.</p>
      <blockquote>"Precision engineering meets artistic boldness."</blockquote>
      <p>We executed high-concept photography shoots in urban city centers and translated these captured moments into beautiful, high-finish double-page spreads for leading lifestyle magazines.</p>
    `
  },
  "gac-gs4-launch": {
    title: "GAC GS4 Launch",
    client: "CIG Motors Co.",
    category: "Media & Film",
    overview: "Orchestrating an unforgettable digital and experiential launch event that captured the imagination of Nigerian car lovers and tech enthusiasts.",
    team: "DEL-YORK Live Productions & Film Engine",
    img: gac_gs4,
    content: `
      <h2>Unveiling Innovation</h2>
      <p>We conceptualized a high-impact reveal sequence incorporating customized robotic lighting matrices, cinematic drone trajectories inside the venue, and a livestream experience.</p>
      <blockquote>"The road to tomorrow starts with a bold first step."</blockquote>
      <p>Our production drove massive engagement, accumulating millions of digital impressions and driving immediate post-launch dealership bookings across key territories.</p>
    `
  }
};

const Work = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromArchive = location.state?.fromArchive || false;

  // 1. Fetch current portfolio
  const { data: serverPortfolio, isLoading } = usePortfolioBySlugQuery(slug || "");
  // 2. Fetch all portfolios for next-project loop
  const { data: allPortfolios } = usePortfoliosQuery();

  // Find fallback details if server is down or item isn't created yet
  const fallback = fallbackProjects[slug || ""] || fallbackProjects["wole-soyinka-at-90"];

  // Resolve active content
  const title = serverPortfolio?.title || fallback.title;
  const client = serverPortfolio?.client || fallback.client;
  const category = serverPortfolio?.capabilities?.[0]?.name || fallback.category;
  const overview = serverPortfolio?.overview || fallback.overview;
  const team = serverPortfolio?.team || fallback.team;
  
  const coverImage = serverPortfolio?.cover_image?.url
    ? `${BACKEND_URL}${serverPortfolio.cover_image.url}`
    : fallback.img;

  const contentHtml = serverPortfolio?.content || fallback.content;

  // Determine "Previous & Next" project navigation
  let prevProject = { title: "Manufacturers Association", slug: "manufacturers-association-of-nigeria" };
  let nextProject = { title: "Islamic Development Bank Group", slug: "islamic-development-bank-group" };
  
  if (allPortfolios && allPortfolios.length > 1) {
    const currentIndex = allPortfolios.findIndex(p => p.slug === slug);
    
    // Next index
    const nextIndex = (currentIndex + 1) % allPortfolios.length;
    const nextItem = allPortfolios[nextIndex];
    nextProject = {
      title: nextItem.title,
      slug: nextItem.slug
    };

    // Prev index
    const prevIndex = (currentIndex - 1 + allPortfolios.length) % allPortfolios.length;
    const prevItem = allPortfolios[prevIndex];
    prevProject = {
      title: prevItem.title,
      slug: prevItem.slug
    };
  } else {
    // Fallback static next/prev chain
    const keys = Object.keys(fallbackProjects);
    const currentIndex = keys.indexOf(slug || "");
    
    const nextIndex = (currentIndex + 1) % keys.length;
    const nextKey = keys[nextIndex];
    nextProject = {
      title: fallbackProjects[nextKey].title,
      slug: nextKey
    };

    const prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    const prevKey = keys[prevIndex];
    prevProject = {
      title: fallbackProjects[prevKey].title,
      slug: prevKey
    };
  }

  // Scroll to top on load/slug change
  const handleNextClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-primary selection:text-white overflow-hidden">
      <Navbar />

      {/* Top Margin for Nav spacer */}
      <div className="h-24 md:h-32" />

      {/* Back Button Container */}
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <Link
          to="/#portfolio"
          state={{ openArchive: fromArchive }}
          className="inline-flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Selected Work
        </Link>
      </div>

      {/* Dynamic Case Study Hero Header (Ogilvy Typographic Style) */}
      <header className="container mx-auto px-6 mb-16 md:mb-24">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
              <span className="text-primary text-xs uppercase tracking-widest font-mono font-bold">
                {category} Case Study
              </span>
            </div>
            
            {/* Massive Typographic Headline */}
            <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-12">
              {title}
            </h1>
          </motion.div>

          {/* Project Details Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-white/10"
          >
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                Client
              </div>
              <p className="text-white text-base md:text-lg font-medium">{client}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <Asterisk className="w-3.5 h-3.5 text-primary" />
                Capability
              </div>
              <p className="text-white text-base md:text-lg font-medium">{category}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono mb-2">
                <Users className="w-3.5 h-3.5 text-primary" />
                Agency Team
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed text-white/80">{team}</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Parallax Cover Banner Image */}
      <section className="w-full px-6 mb-20 md:mb-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl"
          >
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Case Study Overview & Content Section */}
      <section className="container mx-auto px-6 mb-24 md:mb-36">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Executive Overview - Sticky Side Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="border-l-2 border-primary pl-6">
              <span className="text-xs uppercase tracking-widest font-mono text-primary block mb-3">
                Executive Overview
              </span>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic">
                "{overview}"
              </p>
            </div>
          </div>

          {/* Dynamic Content Body (Rich text parsed with absolute CSS styling) */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
              </div>
            ) : (
              <div 
                className="rich-text-content text-foreground/80 leading-relaxed font-body text-base md:text-lg 
                  [&_p]:mb-8 [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:text-base md:[&_p]:text-lg 
                  [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-white [&_h2]:tracking-tight
                  [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-heading [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-white
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-10 [&_blockquote]:text-white/95 [&_blockquote]:font-serif [&_blockquote]:text-lg md:[&_blockquote]:text-xl [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg
                  [&_img]:rounded-2xl [&_img]:my-10 [&_img]:w-full [&_img]:object-cover [&_img]:max-h-[600px] [&_img]:border [&_img]:border-white/10
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_ul]:space-y-3 [&_ul]:text-white/80
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol]:space-y-3 [&_ol]:text-white/80
                  [&_a]:text-primary [&_a]:underline hover:[&_a]:text-white [&_a]:transition-colors"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
          </div>

        </div>
      </section>

      {/* Dual-Panel dynamic prev/next case study footer navigation */}
      <footer className="w-full bg-[#121214] border-t border-white/5 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 relative">
        
        {/* Previous Project Panel */}
        <Link
          to={`/work/${prevProject.slug}`}
          onClick={handleNextClick}
          state={location.state} // Preserve back-to-archive state!
          className="block w-full py-16 md:py-24 px-8 md:px-12 relative overflow-hidden group/prev hover:bg-white/[0.02] transition-all duration-500 text-left"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover/prev:bg-primary/[0.02] transition-colors duration-700" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover/prev:bg-primary group-hover/prev:border-primary group-hover/prev:text-white transition-all duration-500 transform group-hover/prev:-translate-x-2">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-white/40 text-xs uppercase tracking-widest font-mono font-bold group-hover/prev:text-primary transition-colors">
              Previous Case Study
            </span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white/80 group-hover/prev:text-white transition-colors duration-500 relative z-10">
            {prevProject.title}
          </h3>
        </Link>

        {/* Next Project Panel */}
        <Link
          to={`/work/${nextProject.slug}`}
          onClick={handleNextClick}
          state={location.state} // Preserve back-to-archive state!
          className="block w-full py-16 md:py-24 px-8 md:px-12 relative overflow-hidden group/next hover:bg-white/[0.02] transition-all duration-500 text-right"
        >
          <div className="absolute inset-0 bg-primary/0 group-hover/next:bg-primary/[0.02] transition-colors duration-700" />
          <div className="flex items-center gap-4 mb-4 justify-end relative z-10">
            <span className="text-white/40 text-xs uppercase tracking-widest font-mono font-bold group-hover/next:text-primary transition-colors">
              Next Case Study
            </span>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover/next:bg-primary group-hover/next:border-primary group-hover/next:text-white transition-all duration-500 transform group-hover/next:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white/80 group-hover/next:text-white transition-colors duration-500 relative z-10">
            {nextProject.title}
          </h3>
        </Link>

      </footer>
    </div>
  );
};

export default Work;
