import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Projects", value: 500, suffix: "+" },
  { label: "Employees", value: 120, suffix: "+" },
  { label: "Clients", value: 300, suffix: "+" },
  { label: "Followers", value: 50, suffix: "K" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
        {count}{suffix}
      </span>
      <p className="text-foreground/60 text-sm mt-2">{stats.find(s => s.value === target)?.label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <Counter key={stat.label} target={stat.value} suffix={stat.suffix} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
