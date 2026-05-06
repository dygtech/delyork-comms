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
          <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">About Agency</span>
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
              We Empowering Your Business Success With{" "}
              <span className="text-primary">Digital Marketing</span>
            </h2>

            <div className="mt-10 flex items-start gap-8">
              <div>
                <div className="flex items-end">
                  <span className="font-heading text-6xl lg:text-7xl font-bold">15</span>
                  <span className="font-heading text-3xl font-bold text-primary">+</span>
                </div>
                <p className="text-primary text-sm mt-1">Years Of Experience</p>
              </div>

              <div className="hidden md:block w-px h-24 bg-border/50" />

              <div className="flex-1">
                <p className="text-foreground/60 text-sm leading-relaxed">
                  At our Creative Digital Agency, we bring your ideas to life beach crafting engaging, impactful
                  digital experiences that captivate audiences.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-6 bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-3 rounded-full text-sm transition-all group"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  Read More
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={aboutTeam}
                alt="About our agency"
                className="w-full h-full object-cover"
                loading="lazy"
                width={640}
                height={800}
              />
            </div>
            {/* Floating rotating badge */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28">
              <svg className="animate-spin-slow w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <path id="aboutCircle" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                </defs>
                <text className="fill-foreground/50 text-[14px] tracking-[3px] uppercase" fontFamily="DM Sans">
                  <textPath href="#aboutCircle">
                    BLENCO • DIGITAL AGENCY • CREATIVE •
                  </textPath>
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
