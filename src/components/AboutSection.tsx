import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Asterisk, Plus } from "lucide-react";
import { useRef, useState } from "react";
import aboutTeam from "@/assets/about-team.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const images = [aboutTeam, project1, project2, project3];

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2]); // Toned down rotation
  const imgScale = useTransform(sectionProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-px h-64 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
        <div className="absolute top-3/4 right-20 w-px h-64 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Massive Intro Statement */}
        <div className="mb-32 lg:mb-64">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm font-mono uppercase tracking-[0.3em]">Our Philosophy</span>
          </motion.div>

          <h2 className="font-heading text-[12vw] sm:text-[10vw] lg:text-[8vw] leading-[0.85] uppercase font-black tracking-tighter">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Your Story is <span className="text-primary italic">Complex.</span>
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                We Make it <span className="text-outline text-transparent lg:text-foreground">Irresistible.</span>
              </motion.span>
            </div>
          </h2>
        </div>

        <div ref={scrollRef} className="relative flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Left Column: Sticky Wrapper */}
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-32 h-fit">
              <motion.div
                style={{ rotate }}
                className="relative rounded-[2rem] overflow-hidden group shadow-2xl shadow-primary/20 bg-card border border-primary/10 aspect-[4/5]"
              >
                {/* Clean Cross-Fade with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={images[activeStep]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* Dynamic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div className="space-y-2">
                    <p className="font-heading text-2xl lg:text-3xl uppercase font-bold text-white">The Del-York Edge</p>
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8 bg-primary" />
                      <p className="text-white/60 text-sm font-body tracking-wider uppercase">Strategic Brilliance</p>
                    </div>
                  </motion.div>
                </div>

                {/* Rotating Badge inside the image container */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-44 h-44 hidden xl:block pointer-events-none"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      fill="none"
                    />
                    <text className="fill-primary/50 text-[5px] uppercase font-bold tracking-[2.5px]">
                      <textPath href="#circlePath">
                        • Strategic Excellence • Narrative Mastery • Creative Power •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Scroll Progress Bar for Mobile */}
              <div className="mt-8 lg:hidden w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: sectionProgress }}
                  className="h-full bg-primary origin-left"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Process Cards */}
          <div className="lg:w-1/2 relative">
            {/* Desktop Vertical Progress Line */}
            <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
              <motion.div
                style={{ scaleY: sectionProgress }}
                className="w-full bg-primary origin-top h-full"
              />
            </div>

            <div className="space-y-32 lg:space-y-[40vh] pb-32">
              {[
                {
                  id: "01",
                  title: "Deep Discovery",
                  desc: "We don't just scratch the surface. We dive into the core of your brand, uncovering the 'why' that resonates with your audience's deepest needs and aspirations.",
                  icon: <Asterisk className="w-10 h-10" />,
                },
                {
                  id: "02",
                  title: "Narrative Craft",
                  desc: "Messaging that cuts through the noise. We build a story so compelling, so sharp, that it becomes the only narrative your audience wants to hear and share.",
                  icon: <Plus className="w-10 h-10" />,
                },
                {
                  id: "03",
                  title: "Flawless Execution",
                  desc: "From concept to curtain call, we handle every detail. Our team ensures that your story is told with precision, impact, and unmistakable Del-York style.",
                  icon: <ArrowUpRight className="w-10 h-10" />,
                },
                {
                  id: "04",
                  title: "Lasting Impact",
                  desc: "A great story doesn't end when the lights go out. We create campaigns that live on, building equity and influence long after the initial launch.",
                  icon: <Plus className="w-10 h-10" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0.2, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  onViewportEnter={() => setActiveStep(index)}
                  viewport={{ once: false, margin: "-45% 0% -45% 0%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <span className="text-8xl lg:text-[10rem] font-heading font-black text-white/5 group-hover:text-primary/20 transition-all duration-700 leading-[0.8] select-none">
                        {step.id}
                      </span>
                    </div>
                    <div className="lg:pt-6">
                      <motion.div
                        whileHover={{ rotate: 90, scale: 1.2 }}
                        className="text-primary mb-8 block w-fit cursor-pointer"
                      >
                        {step.icon}
                      </motion.div>
                      <h3 className="font-heading text-4xl lg:text-6xl font-bold uppercase mb-8 tracking-tight group-hover:text-primary transition-colors duration-500">
                        {step.title}
                      </h3>
                      <p className="text-foreground/40 text-xl lg:text-2xl leading-relaxed max-w-xl group-hover:text-foreground transition-colors duration-500">
                        {step.desc}
                      </p>

                      <div className="mt-12 overflow-hidden">
                        <motion.div
                          initial={{ x: "-100%" }}
                          whileInView={{ x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                          className="h-px bg-gradient-to-r from-primary to-transparent w-full opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator / Text */}
      {/* <div className="absolute right-10 bottom-20 vertical-text hidden xl:block opacity-30">
        <span className="text-[10px] font-mono text-foreground uppercase tracking-[1em]">
          Scroll to explore our DNA
        </span>
      </div> */}
    </section>
  );
};

export default AboutSection;



