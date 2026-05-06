import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Great Quality Products With Good ew Packaging unknown printer took a galley of type and scramadawe blede pecimive centuries scramadawe blede dear mention.",
    name: "Brooklyn Simmons",
    role: "Sr.Designer",
    title: "Great Product! Highly Recommended!",
  },
  {
    text: "Great Quality Products With Good ew Packaging unknown printer took a galley of type and scramadawe blede pecimive centuries scramadawe blede dear mention.",
    name: "Brooklyn Simmons",
    role: "Sr.Designer",
    title: "Great Product! Highly Recommended!",
  },
  {
    text: "Great Quality Products With Good ew Packaging unknown printer took a galley of type and scramadawe blede pecimive centuries scramadawe blede dear mention.",
    name: "Brooklyn Simmons",
    role: "Sr.Designer",
    title: "Great Product! Highly Recommended!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Stats card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-primary rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          >
            <span className="font-heading text-6xl md:text-7xl font-bold text-primary-foreground">98%</span>
            <p className="text-primary-foreground/80 text-sm mt-4 max-w-[200px]">
              We Treat Every Patient As An Individual And Create Treatment Plans.
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

          {/* Right - Testimonial slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-card rounded-2xl p-8 md:p-12 relative"
          >
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">{testimonials[current].title}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-lg">
              {testimonials[current].text}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-secondary" />
              <div>
                <h4 className="font-heading font-bold text-sm">{testimonials[current].name}</h4>
                <p className="text-foreground/50 text-xs">{testimonials[current].role}</p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button
                onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrent((current + 1) % testimonials.length)}
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
