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

const items = ["LET'S TALK"];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const TalkMarquee = () => {
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

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  useAnimationFrame((t, delta) => {
    if (smoothVelocity.get() > 0) {
      directionFactor.current = 1;
    } else if (smoothVelocity.get() < 0) {
      directionFactor.current = -1;
    }

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const dragIntensity = 0.05;
    moveBy += (smoothVelocity.get() * (delta / 1000)) * dragIntensity;
    baseX.set(baseX.get() + moveBy);
    rotation.set(rotation.get() + moveBy * 5);
  });

  return (
    <div className="bg-background pt-10 lg:pt-20 overflow-hidden border-t border-border/30 mt-16 group">
      <motion.div
        className="flex whitespace-nowrap cursor-pointer"
        style={{ x }}
      >
        {[...Array(12)].map((_, idx) => (
          <div key={idx} className="flex items-center">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-8 mx-8 flex-shrink-0">
                <span className="font-heading font-black text-foreground text-7xl md:text-9xl lg:text-[12rem] uppercase tracking-tighter transition-colors duration-500 group-hover:text-primary">
                  {item}
                </span>
                <motion.div style={{ rotate: rotation }}>
                  <Asterisk className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-primary" />
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TalkMarquee;
