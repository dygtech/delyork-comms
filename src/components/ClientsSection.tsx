import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Asterisk } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const brands = [
  "Lagos State Government",
  "Mastercard Foundation",
  "Islamic Development Bank",
  "GAC Motors Nigeria",
  "Manufacturers Assoc. of Nigeria",
  "Dangote Foundation",
  "Bank of Industry",
  "LSETF",
  "Ogun State Government",
  "Tribeca Festival",
  "BellaNaija",
  "YAPPI Programme"
];

const ClientCard = ({ 
  brand, 
  index, 
  isRandomlyActive, 
  onHoverStart, 
  onHoverEnd 
}: { 
  brand: string; 
  index: number; 
  isRandomlyActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Center the spotlight if randomly active
  useEffect(() => {
    if (isRandomlyActive && cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  }, [isRandomlyActive]);

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 40%)`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`group relative bg-[#121212] rounded-xl p-8 h-40 flex items-center justify-center border transition-all duration-700 overflow-hidden cursor-pointer ${isRandomlyActive ? "border-primary/50 shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)]" : "border-white/5"
        } hover:border-white/20`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className={`pointer-events-none absolute -inset-px rounded-xl transition duration-500 ${isRandomlyActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        style={{ background }}
      />

      <span className={`font-heading text-lg md:text-xl font-bold text-center transition-colors duration-500 relative z-10 leading-tight ${isRandomlyActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground"
        }`}>
        {brand}
      </span>
    </motion.div>
  );
};

const ClientsSection = () => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isAnyHovered, setIsAnyHovered] = useState(false);

  useEffect(() => {
    if (isAnyHovered) {
      setActiveIdx(-1);
      return;
    }

    const interval = setInterval(() => {
      setActiveIdx(Math.floor(Math.random() * brands.length));
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnyHovered]);

  return (
    <section className="py-24 lg:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-foreground/60 text-sm uppercase tracking-[0.3em] font-bold font-body">Our Network</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
            The <span className="text-primary italic">brands & institutions</span> <br className="hidden md:block" />
            that trust us.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, idx) => (
            <ClientCard
              key={idx}
              brand={brand}
              index={idx}
              isRandomlyActive={activeIdx === idx}
              onHoverStart={() => setIsAnyHovered(true)}
              onHoverEnd={() => setIsAnyHovered(false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
