const ProjectMarquee = () => {
  const items = ["Let's Look", "What We Have Done"];

  return (
    <div className="bg-background py-8 overflow-hidden border-y border-border/30">
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 mx-6 flex-shrink-0">
            <span className="font-heading font-bold text-foreground text-2xl md:text-3xl uppercase tracking-wide">
              {items[i % 2]}
            </span>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="font-heading font-bold text-primary-foreground text-sm">B</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;
