import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const word1 = "DELYORK";
const word2 = "COMMUNICATIONS";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {/* Top Panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.2 }}
            className="flex-1 relative overflow-hidden flex flex-col justify-end items-center pb-2"
            style={{ backgroundColor: "hsl(0, 100%, 32%)" }}
          >
            <div className="flex overflow-hidden">
              {word1.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5 + i * 0.1,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter"
                  style={{ color: "hsl(0, 0%, 100%)" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Bottom Panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 3.2 }}
            className="flex-1 relative overflow-hidden flex flex-col justify-start items-center pt-2"
            style={{ backgroundColor: "hsl(0, 100%, 32%)" }}
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{
                  duration: 1.2,
                  delay: 1.2,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="font-heading text-lg md:text-xl lg:text-2xl font-medium tracking-[0.3em] uppercase"
                style={{ color: "hsl(0, 0%, 100%)" }}
              >
                {word2}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
