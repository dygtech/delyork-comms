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
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Preloader />
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <StatsNarrativeSection />
      <ServicesSection />
      <ProjectMarquee />
      <PortfolioSection />
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
