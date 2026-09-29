import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LatestQuestsSection from "@/components/LatestQuestsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import ComparisonSection from "@/components/ComparisonSection";
import WorkWithUsSection from "@/components/WorkWithUsSection";
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
      className="bg-[#0A0A0A] text-white min-h-screen"
    >
      <Navbar />
      <HeroSection />
      <LatestQuestsSection />
      <ServicesSection />
      <PortfolioSection />
      <WhatWeOfferSection />
      <ComparisonSection />
      <WorkWithUsSection />
      <Footer />
    </motion.main>
  );
};

export default Index;

