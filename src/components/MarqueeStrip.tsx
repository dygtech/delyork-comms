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

const items = [
  "Strategic Communications",
  "Event Planning & Execution",
  "Partnership Engagement",
  "Public Relations",
  "Media Consulting",
  "Project Management",
  "Content & Storytelling",
  "Reputation Management",
];

// Helper to wrap values for infinite loop
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const MarqueeStrip = () => {
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

  // Map the baseX to a percentage transform
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

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

    // Update rotation based on movement (10x faster for visual impact)
    rotation.set(rotation.get() + moveBy * 10);
  });

  return (
    <div className="bg-primary py-6 overflow-hidden border-y border-white/10 relative z-10">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x }}
      >
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="flex items-center">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-6 mx-4 flex-shrink-0">
                <span className="font-body font-bold text-white text-lg md:text-xl uppercase">
                  {item}
                </span>
                <div className="h-5 w-[1px] bg-white ml-2" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};



export default MarqueeStrip;

