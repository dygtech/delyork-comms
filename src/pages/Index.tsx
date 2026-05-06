import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectMarquee from "@/components/ProjectMarquee";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ServicesSection />
      <ProjectMarquee />
      <PortfolioSection />
      <ClientsSection />
      <VideoSection />
      <PricingSection />
      <TestimonialsSection />
      <StatsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
