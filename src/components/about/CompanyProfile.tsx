import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const CompanyProfile = () => {
  return (
    <section className="py-24 lg:py-40 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-16"
        >
          <Asterisk className="w-5 h-5 text-primary" />
          <span className="text-black/50 text-sm uppercase tracking-widest font-body font-semibold">
            Company Profile
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.0] text-black text-balance">
              Beyond the Traditional Agency
            </h2>

            <div className="mt-12 pt-12 border-t border-black/10 grid grid-cols-2 gap-8">
              {[
                { label: "Years of Operation", value: "15+" },
                { label: "Group Subsidiaries", value: "8" },
                { label: "Creative Alumni Network", value: "4K+" },
                { label: "Media Placements / Campaign", value: "40+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-black/50 text-xs uppercase tracking-wider font-semibold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Body Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6 text-black/70 font-body text-lg leading-relaxed"
          >
            <p>
              <strong className="text-black">Del-York Communications (DYC)</strong> is Africa's Strategic Communications, Influence and AI Creative Transformation Company. We are not a traditional advertising or PR agency. We are a strategic business partner.
            </p>
            <p>
              While conventional agencies focus on creative executions, campaigns and production output, DYC builds, manages and operates integrated communication systems that help governments, institutions, corporations and leaders shape reputation, build influence, attract investment and drive transformation.
            </p>
            <p>
              We work at the intersection of strategy, communications, AI technology and creative production — operating embedded communication offices, AI-powered creative systems and executive influence programmes that are deeply integrated into the business and leadership operations of our clients.
            </p>
            <p>
              Part of the Del-York Group — a creative economy conglomerate with subsidiaries in film, talent development, digital learning, and creative enterprise — DYC brings 15+ years of expertise in media, communications and creative industries to every engagement. Lagos-based. Africa-focused. Globally minded.
            </p>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 pl-6 border-l-4 border-primary"
            >
              <p className="text-xl md:text-2xl font-heading font-bold text-black leading-snug">
                "Our clients do not come to us for campaigns. They come to us for transformation."
              </p>
            </motion.blockquote>
          </motion.div>
        </div>

        {/* Values Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 rounded-3xl overflow-hidden"
        >
          {[
            {
              title: "Our Mission",
              text: "To be the strategic communications partner of choice for Africa's most ambitious governments, institutions and businesses — helping them communicate with power, precision and purpose.",
            },
            {
              title: "Our Vision",
              text: "To build Africa's most respected and influential communications and creative transformation company — one that sets the standard for strategic excellence across the continent and globally.",
            },
            {
              title: "Our Approach",
              text: "We design, build and operate integrated communication systems — not one-off campaigns. Every engagement is built around measurable business outcomes, sustained stakeholder relationships and long-term reputation capital.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-neutral-50 p-10 md:p-12 hover:bg-white transition-colors duration-300 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block">
                {item.title}
              </span>
              <p className="text-black/70 font-body leading-relaxed text-base">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyProfile;
