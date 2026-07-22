import { motion } from "framer-motion";
import { X, Check, Asterisk } from "lucide-react";
import { useRef } from "react";

const comparisonData = [
  { traditional: "Sells creative services", dyc: "Delivers strategic business outcomes" },
  { traditional: "Executes campaigns", dyc: "Solves complex communication and reputation challenges" },
  { traditional: "Focuses on marketing activities", dyc: "Aligns communications with business strategy" },
  { traditional: "Creates content", dyc: "Shapes perception and builds trust" },
  { traditional: "Runs social media", dyc: "Builds influence across stakeholders" },
  { traditional: "Designs brands", dyc: "Builds reputation and institutional credibility" },
  { traditional: "Generates publicity", dyc: "Strengthens leadership visibility and executive influence" },
  { traditional: "Delivers one-off projects", dyc: "Builds long-term strategic partnerships" },
  { traditional: "Measures likes, impressions and reach", dyc: "Measures reputation, influence and business impact" },
  { traditional: "Works with marketing teams", dyc: "Partners with CEOs, boards, governments and executive leadership" },
  { traditional: "Provides creative resources", dyc: "Operates embedded communications and AI-powered creative offices" },
  { traditional: "Reacts to communication needs", dyc: "Anticipates risks, manages crises and drives transformation" },
  { traditional: "Uses AI as a production tool", dyc: "Integrates AI to transform communication systems and multiply creative capacity" },
  { traditional: "Ends at campaign delivery", dyc: "Supports sustained organizational growth, investment attraction and stakeholder confidence" },
];

const ComparisonSection = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-24 lg:py-40 bg-background border-y border-black/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest font-body font-semibold">The DYC Difference</span>
            <Asterisk className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 uppercase text-foreground leading-[1.1]">
            Why Clients Choose Us
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 font-body leading-relaxed text-balance mx-auto">
            We don't sell campaigns—we build communication ecosystems that create influence, inspire confidence and deliver measurable results.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto">

          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 mb-12 px-8">
            <div className="text-right">
              <h3 className="text-2xl font-heading font-bold text-foreground/30 uppercase tracking-wider">Traditional Agency</h3>
            </div>
            <div className="w-12"></div> {/* Spacer for middle line */}
            <div className="text-left">
              <h3 className="text-2xl font-heading font-bold text-primary uppercase tracking-wider">Del-York Communications</h3>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-0 relative">
            {/* Central vertical line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white dark:bg-white/10 -translate-x-1/2"></div>

            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-stretch md:items-center group"
              >

                {/* Mobile Context Headers (Hidden on desktop) */}
                <div className="md:hidden flex items-center justify-between px-2 mb-[-8px]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Traditional Agency</span>
                </div>

                {/* Left Side (Traditional) */}
                <div className="bg-neutral-100 dark:bg-neutral-900 md:bg-transparent rounded-2xl md:rounded-none p-6 md:p-8 md:text-right flex items-center md:justify-end border border-black/5 md:border-none">
                  <div className="flex items-start gap-4 md:flex-row-reverse w-full md:w-auto">
                    <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-1 md:mt-0">
                      <X className="w-3 h-3 text-foreground/40" />
                    </div>
                    <p className="text-base md:text-lg text-foreground/50 font-body leading-relaxed line-through decoration-foreground/20">{item.traditional}</p>
                  </div>
                </div>

                {/* Mobile Context Headers (Hidden on desktop) */}
                <div className="md:hidden flex items-center justify-between px-2 mt-2 mb-[-8px]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">DYC Difference</span>
                </div>

                {/* Middle Node (Desktop only) */}
                <div className="hidden md:flex flex-col items-center justify-center relative z-10 w-12 py-8">
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-white dark:border-white/10 group-hover:border-primary group-hover:scale-150 transition-all duration-300"></div>
                </div>

                {/* Right Side (DYC) */}
                <div className="bg-white dark:bg-neutral-950 md:bg-transparent rounded-2xl md:rounded-none p-6 md:p-8 flex items-center shadow-lg md:shadow-none border border-black/5 md:border-none relative z-10 md:z-auto">
                  <div className="flex items-start gap-4 w-full md:w-auto">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 md:mt-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg md:text-xl text-foreground font-semibold font-body leading-relaxed">{item.dyc}</p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
