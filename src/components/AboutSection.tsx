import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <Asterisk className="w-5 h-5 text-primary" />
          <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">We do the work for you</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Your story is {" "}
              <span className="text-primary">complex.</span>
            </h2>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              We make it {" "}
              <span className="text-primary">irresistible.</span>
            </h2>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  id: "01",
                  title: "We find your why",
                  desc: "Before we do anything, we understand what actually drives you - then build everything around it.",
                },
                {
                  id: "02",
                  title: "We craft the narrative",
                  desc: "Messaging that's sharp, honest, and impossible to ignore. For every audience that matters to you.",
                },
                {
                  id: "03",
                  title: "We show up and deliver",
                  desc: "From press conferences to flagship summits - we handle it end-to-end so you don't have to stress.",
                },
                {
                  id: "04",
                  title: "We make the story last",
                  desc: "Because after the room clears, the narrative should keep working. We build for that.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group relative"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-primary font-medium tracking-tighter">
                        {item.id}
                      </span>
                      <div className="h-px w-8 group-hover:w-12 transition-all duration-500 bg-primary" />
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base leading-relaxed max-w-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary transition-all duration-700 rounded-full" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50 group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={aboutTeam}
                alt="About our agency"
                className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto"
                loading="lazy"
                width={640}
                height={800}
              />
            </div>
            {/* Floating rotating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-background rounded-full flex items-center justify-center p-2 shadow-xl"
            >
              <svg className="animate-spin-slow w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <path id="aboutCircle" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                </defs>
                <text className="fill-primary text-[16px] font-bold tracking-[4px] uppercase" fontFamily="DM Sans">
                  <textPath href="#aboutCircle">
                    DEL-YORK • COMMUNICATIONS • STRATEGY • CREATIVE •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Asterisk className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
