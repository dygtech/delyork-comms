import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const quotes = [
  "We tell stories that resonate. For brands, institutions, and governments that shape the future of Nigeria and sub-Saharan Africa.",
  "We pave the way for Africa's unparalleled rise on the world stage, blending global insights with local expertise.",
  "Innovative ideation and execution birth unique solutions that transform the narrative of our continent.",
  "Global Talent, African Vision: Media as a powerful tool for nation-building and strategic influence."
];

const QuoteSlider = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-xl text-center lg:text-left relative">
      <div className="min-h-[120px] md:min-h-[100px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-foreground/80 text-lg md:text-xl leading-relaxed font-body italic"
          >
            "{quotes[currentQuote]}"
          </motion.p>
        </AnimatePresence>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex gap-2 mt-6 justify-center lg:justify-start">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQuote(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentQuote === i ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to quote ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteSlider;
