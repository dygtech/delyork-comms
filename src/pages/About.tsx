import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import CompanyProfile from "@/components/about/CompanyProfile";
import CoreProblems from "@/components/about/CoreProblems";
import StrategicPortfolio from "@/components/about/StrategicPortfolio";
import DeliveryCapabilities from "@/components/about/DeliveryCapabilities";
import ComparisonSection from "@/components/ComparisonSection";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 500);
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
      <Navbar />

      {/* Hero */}
      <AboutHero />

      {/* Company Profile — white section */}
      <CompanyProfile />

      {/* Core Problems We Solve — dark section */}
      <CoreProblems />

      {/* Strategic Product Portfolio — dark neutral section */}
      <StrategicPortfolio />

      {/* Delivery Capabilities — white section */}
      <DeliveryCapabilities />

      {/* The DYC Difference — reuse the existing comparison table */}
      <ComparisonSection />

      <Footer />
    </motion.main>
  );
};

export default About;
