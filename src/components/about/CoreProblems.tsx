import { motion } from "framer-motion";
import { Asterisk, ArrowRight } from "lucide-react";

const coreProblems = [
  {
    challenge: "Our reputation was damaged by a crisis",
    solution: "Crisis War Room: Rapid-response management to protect trust, manage media and restore confidence.",
  },
  {
    challenge: "We need to attract foreign investment",
    solution: "Investment Attraction Communications: Compelling narratives for investors, analysts and multilateral institutions.",
  },
  {
    challenge: "Our CEO needs to build a public profile",
    solution: "Executive Influence Office: Thought leadership, media positioning and speaking strategy for senior leaders.",
  },
  {
    challenge: "We can't afford a full marketing team",
    solution: "Embedded Creative Office: A fully managed communications department functioning as your in-house team.",
  },
  {
    challenge: "We need to produce more content faster",
    solution: "AI Creative Operations Office: AI-powered systems that scale content creation without scaling headcount.",
  },
  {
    challenge: "Citizens don't trust our government",
    solution: "Government Communications Office: Strategic policy communication, citizen engagement and public narrative management.",
  },
  {
    challenge: "Our brand isn't taken seriously internationally",
    solution: "Creative Economy Communications: Positioning for global relevance, policy support and international partnerships.",
  },
  {
    challenge: "Our stakeholders don't understand our transformation agenda",
    solution: "All seven product lines can integrate to create a unified transformation narrative across internal and external audiences.",
  },
];

const CoreProblems = () => {
  return (
    <section className="py-24 lg:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Asterisk className="w-5 h-5 text-primary" />
            <span className="text-foreground/50 text-sm uppercase tracking-widest font-body font-semibold">
              The Core Problems We Solve
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-[1.0] text-foreground">
            Your Challenge.<br />
            <span className="text-primary">Our Solution.</span>
          </h2>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreProblems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (index % 2) * 0.1 }}
              className="group relative bg-white/5 hover:bg-white/8 border border-white/8 hover:border-primary/40 rounded-2xl p-8 md:p-10 transition-all duration-400 overflow-hidden"
            >
              {/* Index number */}
              <span className="absolute top-6 right-8 font-heading text-5xl font-bold text-white/[0.04] group-hover:text-primary/10 transition-colors duration-300 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Challenge */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 mb-3 block">
                  Business Challenge
                </span>
                <p className="text-xl md:text-2xl font-heading font-bold text-foreground leading-snug">
                  "{item.challenge}"
                </p>
              </div>

              {/* Arrow separator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-white/10" />
                <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Solution */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-3 block">
                  DYC Strategic Solution
                </span>
                <p className="text-foreground/70 font-body leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreProblems;
