import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
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

        <div className="w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Your story is <span className="text-primary">complex.</span> We make it <span className="text-primary">irresistible.</span>
            </h2>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
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


        </div>
      </div>
    </section>
  );
};

export default AboutSection;
