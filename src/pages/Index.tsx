import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        // Soft timeout to guarantee DOM paint is complete and scroll systems are ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div className="bg-background text-foreground min-h-screen">
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
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
