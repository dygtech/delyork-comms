import { Asterisk } from "lucide-react";

const items = [
  "Website Design",
  "Digital Marketing Agency",
  "IT Solutions Company",
  "Innovative Idea Generating",
  "Design & Development",
];

const MarqueeStrip = () => {
  return (
    <div className="bg-foreground py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 mx-4 flex-shrink-0">
            <Asterisk className="w-6 h-6 text-primary" />
            <span className="font-heading font-bold text-background text-lg md:text-xl uppercase tracking-wider">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
