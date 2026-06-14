import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth, snappy movement without bouncy spring effect
  const springX = useSpring(cursorX, { damping: 50, stiffness: 600, mass: 0.1 });
  const springY = useSpring(cursorY, { damping: 50, stiffness: 600, mass: 0.1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target.closest('[data-project-hover="true"]')) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-24 h-24 -ml-12 -mt-12 bg-primary rounded-full flex items-center justify-center shadow-2xl"
      >
        <ArrowRight className="w-10 h-10 text-white" />
      </motion.div>
    </motion.div>
  );
};
