import { motion } from "framer-motion";
import heroVideo from "@/assets/video/dyc_hero.mp4";
import dycLogo from "@/assets/dyc-logo.gif";

const HeroSection = () => {
  return (
    <section className="relative bg-[#0A0A0A] text-white pt-24 pb-0 overflow-hidden min-h-[90vh] flex flex-col justify-between">
      {/* Background visual layers */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Futuristic shattered glass grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,28,36,0.15)_0,transparent_70%)] pointer-events-none" />
      </div>

      {/* Main Center Content */}
      <div className="container mx-auto px-6 relative z-10 my-auto py-16 flex flex-col items-center justify-center text-center">
        
      </div>

      {/* Red Marquee Strip Banner */}
      <div className="relative z-20 w-full bg-[#ED1C24] text-white py-4 overflow-hidden border-y border-red-700 shadow-lg">
        <div className="flex w-max animate-marquee font-heading text-lg md:text-xl font-bold tracking-widest uppercase items-center whitespace-nowrap">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-6 px-4">
              <span>PARTNERSHIP ENGAGEMENT</span>
              <span className="opacity-50">|</span>
              <span>PUBLIC RELATIONS</span>
              <span className="opacity-50">|</span>
              <span>MEDIA CONSULTING</span>
              <span className="opacity-50">|</span>
              <span>PROJECT MANAGEMENT</span>
              <span className="opacity-50">|</span>
              <span>CONTENT & STORYTELLING</span>
              <span className="opacity-50">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

