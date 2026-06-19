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

const Index = () => {
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
