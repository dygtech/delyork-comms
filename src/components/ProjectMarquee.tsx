import { Asterisk } from "lucide-react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

// Helper to wrap values for infinite loop
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const ProjectMarquee = () => {
  const items = ["Let's Look", "What We Have Done"];
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const baseVelocity = 2.5;
  const directionFactor = useRef<number>(1);
  const rotation = useMotionValue(0);

  // Map the baseX to a percentage transform (wrapping from -50 to 0)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    /**
     * Change direction based on scroll velocity
     */
    if (smoothVelocity.get() > 0) {
      directionFactor.current = 1;
    } else if (smoothVelocity.get() < 0) {
      directionFactor.current = -1;
    }

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Scroll boost
    const dragIntensity = 0.05; 
    moveBy += (smoothVelocity.get() * (delta / 1000)) * dragIntensity;

    baseX.set(baseX.get() + moveBy);
    
    // Update rotation based on movement
    rotation.set(rotation.get() + moveBy * 10);
  });

  return (
    <div className="bg-background py-8 overflow-hidden border-y border-border/30">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 mx-6 flex-shrink-0">
                <span className="font-heading font-bold text-foreground text-2xl md:text-3xl uppercase tracking-wide">
                  {items[i % 2]}
                </span>
                <motion.div style={{ rotate: rotation }}>
                  <Asterisk className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectMarquee;


