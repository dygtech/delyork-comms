import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Del-York’s strategic approach to our government communications was a game-changer. They didn't just deliver a campaign; they reshaped the narrative of our entire institution on a global stage.",
    name: "Dr. Olufemi Hamzat",
    role: "Lagos State Government",
    title: "Unmatched Strategic Impact",
  },
  {
    text: "The creative energy they brought to the GAC Motors launch in Nigeria was phenomenal. Their ability to blend local insights with world-class production is what sets them apart.",
    name: "Diana Chen",
    role: "Chairman, CIG Motors",
    title: "World-Class Creative Execution",
  },
  {
    text: "Working with Del-York on the Creative Lagos project proved their commitment to capacity building. They are more than an agency; they are partners in progress.",
    name: "Gbenga Omotoso",
    role: "Hon. Commissioner for Information",
    title: "Partners in Progress",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Stats card (Original UI) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-primary rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          >
            <span className="font-heading text-6xl md:text-7xl font-bold text-primary-foreground">98%</span>
            <p className="text-primary-foreground/80 text-sm mt-4 max-w-[200px]">
              We build lasting institutional relationships through consistent excellence and strategic depth.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary-foreground text-primary-foreground" />
                ))}
              </div>
              <span className="text-primary-foreground/80 text-sm font-bold">5.9K</span>
            </div>
          </motion.div>

          {/* Right - Testimonial slider (Original UI) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">{testimonials[current].title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-lg">
                  {testimonials[current].text}
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">{testimonials[current].name}</h4>
                    <p className="text-foreground/50 text-xs">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
