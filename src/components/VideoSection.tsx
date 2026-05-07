import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";
import videoThumb from "@/assets/video-thumb.jpg";

const VideoSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Exactly as requested: starts at 30%, expands to 100%
  // Animation happens centered around the midpoint
  const width = useTransform(scrollYProgress, [0.4, 0.6], ["30%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0.4, 0.6], ["20px", "0px"]);
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1]);

  return (
    <section ref={containerRef} className="h-[200vh] bg-background relative">
      {/* Sticky wrapper to hold the view during the expansion */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The expanding div (The "Mask") */}
        <motion.div
          style={{ 
            width, 
            borderRadius,
            scale,
            transformOrigin: "50% 50%"
          }}
          className="relative aspect-video md:aspect-[21/9] overflow-hidden shadow-2xl z-10"
        >
          {/* The Content Inside: Must stay full-width to create the "reveal" effect */}
          <div className="absolute inset-0 w-[100vw] left-1/2 -translate-x-1/2 h-full">
            <img
              src={videoThumb}
              alt="Watch our video"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Interaction Layer - Inside the reveal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]) }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-20 h-20 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group"
                >
                  <div className="absolute inset-2 rounded-full border border-white/10 group-hover:scale-110 transition-transform" />
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-white fill-white ml-2" />
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom Text */}
            <div className="absolute bottom-10 left-10">
              <motion.div 
                style={{ opacity: useTransform(scrollYProgress, [0.58, 0.68], [0, 1]) }}
                className="flex items-center gap-4 text-white"
              >
                <div className="w-12 h-px bg-primary" />
                <span className="text-xs uppercase tracking-widest font-bold font-body">Watch our Showreel 2026</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Ambient background (optional, can be plain bg-background) */}
        <div className="absolute inset-0 bg-background pointer-events-none" />
      </div>
    </section>
  );
};

export default VideoSection;
