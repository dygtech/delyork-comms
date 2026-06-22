import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import StatsNarrativeSection from "@/components/StatsNarrativeSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectMarquee from "@/components/ProjectMarquee";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CareersSection from "@/components/CareersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.hash]);
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground min-h-screen"
    >
      {/* <Preloader /> */}
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <PortfolioSection />
      <AboutSection />
      <StatsNarrativeSection />
      <ServicesSection />
      {/* <ProjectMarquee /> */}
      <ClientsSection />
      <VideoSection />
      {/* <PricingSection /> */}
      <TestimonialsSection />
      <BlogSection />
      <CareersSection />
      <CTASection />
      <Footer />
    </motion.main>
  );
};

export default Index;
