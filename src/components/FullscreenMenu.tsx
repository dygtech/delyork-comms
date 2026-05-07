import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "About",
    href: "#about",
    video: "https://cdn.pixabay.com/video/2017/01/07/7128-198606859_large.mp4"
  },
  {
    title: "Services",
    href: "#services",
    video: "https://videos.pexels.com/video-files/5683809/5683809-uhd_2560_1440_25fps.mp4"
  },
  {
    title: "Blog",
    href: "#blog",
    video: "https://videos.pexels.com/video-files/9305500/9305500-uhd_2732_1440_30fps.mp4"
  },
  {
    title: "Contact",
    href: "#contact",
    video: "https://videos.pexels.com/video-files/7661276/7661276-uhd_2560_1440_25fps.mp4"
  },
];

const FullscreenMenu = ({ isOpen, onClose }: FullscreenMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ backgroundColor: '#a30000' }}
        >
          {/* Animated Background Overlay */}
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-[-1]"
            style={{ backgroundColor: '#a30000' }}
          />
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-6 lg:px-20 lg:py-10 relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm font-body uppercase tracking-widest">Navigation</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-white text-sm font-body font-bold">Index</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#contact" onClick={onClose} className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white text-primary font-heading font-bold text-sm hover:scale-105 transition-transform">
                LET'S TALK
              </a>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Follow Cursor Video Preview - Moved BEFORE items to be under them */}
          <motion.div
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
              x: "-50%",
              y: "-50%",
            }}
            className="fixed pointer-events-none z-[5] overflow-hidden rounded-xl shadow-2xl border-4 border-white/10 bg-black/20 backdrop-blur-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: hoveredItem !== null ? 1 : 0,
              opacity: hoveredItem !== null ? 1 : 0,
              width: hoveredItem !== null ? 350 : 0,
              height: hoveredItem !== null ? 220 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {menuItems.map((item, idx) => (
              <AnimatePresence key={idx}>
                {hoveredItem === idx && (
                  <motion.video
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
            ))}
          </motion.div>

          {/* Menu Items - Higher Z-index to stay above video */}
          <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 relative z-[10]">
            <div className="flex flex-col">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="group/item"
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-6 lg:py-8 group"
                  >
                    <span className="font-heading font-bold text-5xl md:text-7xl lg:text-[6.5rem] text-white/40 group-hover:text-white transition-colors duration-500 tracking-tighter">
                      {item.title}
                    </span>
                    <ArrowRight className="w-12 h-12 text-white/0 group-hover:text-white group-hover:translate-x-4 transition-all duration-500" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10">
            <div className="flex gap-8">
              {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-white/60 hover:text-white text-sm font-body uppercase tracking-widest">
                  {social}
                </a>
              ))}
            </div>
            <div className="text-white/40 text-xs font-body uppercase tracking-widest">
              © 2026 DYC. ALL RIGHTS RESERVED.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenMenu;
