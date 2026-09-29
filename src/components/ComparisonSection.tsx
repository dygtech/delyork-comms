import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

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
];

const ComparisonSection = () => {
  return (
    <section id="partners" className="py-24 lg:py-36 bg-[#0B0B0B] text-white border-b border-neutral-800 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-tight">
            WHY CLIENTS <span className="text-[#ED1C24]">CHOOSE US</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-xl mt-4 font-body leading-relaxed">
            We don't sell campaigns - we build communication ecosystems that create influence, inspire confidence and deliver measurable results.
          </p>
        </div>

        {/* Table Container */}
        <div className="max-w-5xl mx-auto bg-[#0F0F0F] rounded-2xl border border-neutral-800 p-6 md:p-10 shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-neutral-800 mb-6">
            <div className="text-left font-heading text-xl md:text-2xl font-bold uppercase text-neutral-500 tracking-wider">
              TRADITIONAL AGENCY
            </div>
            <div className="text-left font-heading text-xl md:text-2xl font-bold uppercase text-[#ED1C24] tracking-wider">
              DEL-YORK COMMUNICATIONS
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-800/60">
            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-4 items-center"
              >
                {/* Traditional Side */}
                <div className="flex items-center gap-3 text-neutral-400 font-body text-sm md:text-base">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-neutral-500" />
                  </div>
                  <span>{item.traditional}</span>
                </div>

                {/* DYC Side */}
                <div className="flex items-center gap-3 text-white font-body font-semibold text-sm md:text-base">
                  <div className="w-5 h-5 rounded-full bg-[#ED1C24]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#ED1C24]" />
                  </div>
                  <span>{item.dyc}</span>
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

