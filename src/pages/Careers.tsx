import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  ArrowUpRight,
  Asterisk,
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  CheckCircle2,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useJobListingsQuery } from "@/services/queries";
import { submitJobApplication } from "@/services/api";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  slug: string;
  description?: string;
  requirements?: string[];
}

/* ─── Fallback data ───────────────────────────────────────────────────────── */
const defaultJobs: Job[] = [
  {
    id: 1,
    title: "Senior Communications Strategist",
    department: "Strategy",
    location: "Lagos, Nigeria",
    type: "Full-time",
    slug: "senior-communications-strategist",
    description:
      "Lead the development of bold, integrated communication strategies for our top-tier clients across Africa and beyond. You'll own the narrative from discovery to delivery.",
    requirements: [
      "7+ years in PR, corporate communications, or brand strategy",
      "Exceptional written and verbal communication skills",
      "Experience managing multi-stakeholder campaigns",
      "Proven track record with C-suite clients",
    ],
  },
  {
    id: 2,
    title: "Event Production Manager",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    slug: "event-production-manager",
    description:
      "Oversee end-to-end event production for flagship summits, press conferences, and brand activations. You'll coordinate vendors, venues, and timelines with precision.",
    requirements: [
      "5+ years in live event production",
      "Strong vendor and budget management skills",
      "Experience with high-profile government or corporate events",
      "Ability to thrive under pressure",
    ],
  },
  {
    id: 3,
    title: "Public Relations Executive",
    department: "PR & Media",
    location: "Hybrid",
    type: "Full-time",
    slug: "public-relations-executive",
    description:
      "Drive media relations, press coverage, and brand visibility for our clients. You'll craft compelling press materials and cultivate relationships across key media houses.",
    requirements: [
      "3+ years in public relations or media",
      "Existing relationships with Nigerian and international press",
      "Strong writing and pitching skills",
      "Crisis communication experience is a plus",
    ],
  },
  {
    id: 4,
    title: "Content Strategist & Storyteller",
    department: "Creative",
    location: "Hybrid",
    type: "Full-time",
    slug: "content-strategist",
    description:
      "Shape how our clients tell their stories across digital and traditional platforms. You'll produce long-form narratives, social content, and brand copy that resonates.",
    requirements: [
      "Portfolio demonstrating compelling, original content",
      "Experience with B2B and B2C content strategies",
      "Deep understanding of SEO and content distribution",
      "Ability to write across multiple brand voices",
    ],
  },
  {
    id: 5,
    title: "Partnership & Stakeholder Engagement Lead",
    department: "Business Development",
    location: "Lagos, Nigeria",
    type: "Full-time",
    slug: "partnership-lead",
    description:
      "Build and nurture high-value relationships with partners, sponsors, and stakeholders. You'll drive co-branded initiatives that extend our clients' reach.",
    requirements: [
      "5+ years in business development or partnerships",
      "Strong negotiation and relationship management skills",
      "Experience in media, government, or NGO sectors preferred",
      "Entrepreneurial mindset",
    ],
  },
];

/* ─── Marquee helper ─────────────────────────────────────────────────────── */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const marqueeItems = [
  "Join Our Team",
  "Shape the Narrative",
  "Tell Bigger Stories",
  "Build Your Career",
  "Work With Purpose",
];

const CareersMarquee = ({ reverse = false }: { reverse?: boolean }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const baseVelocity = reverse ? -2 : 2;
  const directionFactor = useRef<number>(1);
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (smoothVelocity.get() > 0) directionFactor.current = 1;
    else if (smoothVelocity.get() < 0) directionFactor.current = -1;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += smoothVelocity.get() * (delta / 1000) * 0.05;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden py-4 border-y border-border/20">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...Array(10)].map((_, idx) => (
          <div key={idx} className="flex items-center">
            {marqueeItems.map((item, i) => (
              <div key={i} className="flex items-center gap-6 mx-6 flex-shrink-0">
                <span
                  className={`font-heading font-bold uppercase tracking-tight text-3xl md:text-4xl lg:text-5xl ${reverse ? "text-foreground/10" : "text-foreground/8"
                    }`}
                  style={{
                    WebkitTextStroke: reverse
                      ? "1px hsl(var(--primary), 0.5)"
                      : "1px hsl(var(--foreground) / 0.15)",
                    color: "transparent",
                  }}
                >
                  {item}
                </span>
                <Asterisk
                  className={`w-5 h-5 flex-shrink-0 ${reverse ? "text-primary/40" : "text-foreground/20"
                    }`}
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Application Modal ──────────────────────────────────────────────────── */
const ApplicationModal = ({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    portfolio_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitJobApplication({ ...form, job_listing: job.id });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="relative bg-card border border-border/40 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-background/50 border border-border/30 hover:bg-primary hover:border-primary text-foreground/60 hover:text-white transition-all group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-3">Application Sent!</h3>
              <p className="text-foreground/60 text-sm font-body leading-relaxed max-w-xs mx-auto">
                Thank you for applying for{" "}
                <span className="text-primary font-medium">{job.title}</span>. We'll be in touch within 5 business days.
              </p>
              <button
                onClick={onClose}
                className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-primary text-xs uppercase tracking-widest font-mono font-bold">
                  Apply Now
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mt-2 leading-tight">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-foreground/50 text-xs font-body">
                    <MapPin className="w-3 h-3 text-primary/60" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground/50 text-xs font-body">
                    <Clock className="w-3 h-3 text-primary/60" />
                    {job.type}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50 block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-background border border-border/30 focus:border-primary px-4 py-3 text-sm font-body text-foreground placeholder:text-foreground/30 outline-none transition-colors rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-mono text-foreground/50 block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-background border border-border/30 focus:border-primary px-4 py-3 text-sm font-body text-foreground placeholder:text-foreground/30 outline-none transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-mono text-foreground/50 block mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 ..."
                      className="w-full bg-background border border-border/30 focus:border-primary px-4 py-3 text-sm font-body text-foreground placeholder:text-foreground/30 outline-none transition-colors rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50 block mb-2">
                    Portfolio / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="portfolio_url"
                    value={form.portfolio_url}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full bg-background border border-border/30 focus:border-primary px-4 py-3 text-sm font-body text-foreground placeholder:text-foreground/30 outline-none transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-foreground/50 block mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="cover_letter"
                    required
                    value={form.cover_letter}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us why you're the right fit for this role..."
                    className="w-full bg-background border border-border/30 focus:border-primary px-4 py-3 text-sm font-body text-foreground placeholder:text-foreground/30 outline-none transition-colors resize-none rounded-sm"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-body">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-8 py-4 text-sm font-medium transition-all rounded-sm"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Job Accordion Row ──────────────────────────────────────────────────── */
const JobRow = ({ job, index }: { job: Job; index: number }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        id={job.slug}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-border/20 last:border-b-0"
      >
        {/* Row header */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-7 px-0">
            <div className="flex items-center gap-5">
              <span className="text-xs font-mono text-primary/60 w-8 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                  {job.title}
                </h3>
                <span className="text-foreground/40 text-xs uppercase tracking-widest font-mono">
                  {job.department}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 pl-13 sm:pl-0">
              <span className="flex items-center gap-1.5 text-foreground/50 text-xs font-body">
                <MapPin className="w-3 h-3 text-primary/60" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-foreground/50 text-xs font-body">
                <Clock className="w-3 h-3 text-primary/60" />
                {job.type}
              </span>
              <div className="w-8 h-8 rounded-full border border-border/30 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300 shrink-0">
                {open ? (
                  <ChevronUp className="w-4 h-4 text-foreground/50 group-hover:text-white transition-colors" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-foreground/50 group-hover:text-white transition-colors" />
                )}
              </div>
            </div>
          </div>
        </button>

        {/* Expandable details */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-8 pl-13 pr-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-foreground/70 text-sm font-body leading-relaxed mb-6">
                    {job.description}
                  </p>
                  {job.requirements && job.requirements.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-mono text-primary mb-3">
                        What We're Looking For
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-body text-foreground/60">
                            <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary px-8 py-4 text-sm font-medium transition-all group w-full sm:w-auto"
                  >
                    Apply For This Role
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ApplicationModal job={job} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const Careers = () => {
  const { data: serverJobs } = useJobListingsQuery();

  const jobs: Job[] =
    serverJobs && serverJobs.length > 0
      ? serverJobs.map((j: any) => ({
        id: j.id,
        title: j.title,
        department: j.department || "—",
        location: j.location || "Lagos, Nigeria",
        type: j.employment_type || "Full-time",
        slug: j.slug || String(j.id),
        description: j.description || "",
        requirements: j.requirements
          ? j.requirements.split("\n").filter(Boolean)
          : [],
      }))
      : defaultJobs;

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground min-h-screen"
    >
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="min-h-[70vh] flex items-end relative overflow-hidden bg-background pt-24">
        {/* Big faded background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-heading text-[18vw] lg:text-[14vw] font-bold uppercase leading-none tracking-tighter"
            style={{
              WebkitTextStroke: "1px hsl(var(--foreground) / 0.05)",
              color: "transparent",
            }}
          >
            CAREERS
          </span>
        </div>

        <div className="container mx-auto px-6 relative pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">
              Del-York Communications
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-heading text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.92] tracking-tight max-w-4xl"
          >
            We're Looking For <span className="text-primary">Exceptional</span>{" "}
            People.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-foreground/60 text-sm md:text-base font-body leading-relaxed max-w-lg"
          >
            At Del-York Communications, we believe great storytelling starts with
            great people. If you're driven, creative, and want to shape narratives
            that matter — this is where you belong.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#openings"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-primary/80 hover:text-primary transition-all group"
            >
              View Open Roles
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
            <Link
              to="/#about"
              className="inline-flex items-center gap-2 bg-secondary text-foreground px-8 py-4 text-sm font-medium hover:bg-secondary/60 transition-all"
            >
              Learn About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────────────── */}
      <div className="py-2">
        <CareersMarquee />
        <CareersMarquee reverse />
      </div>

      {/* ── Culture strip ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-card/30 border-y border-border/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                id: "01",
                title: "Purpose-Driven Work",
                desc: "Every project we take on has a reason. You'll always know why your work matters.",
              },
              {
                id: "02",
                title: "Growth & Learning",
                desc: "We invest in people. Mentorship, training, and room to evolve are built into our culture.",
              },
              {
                id: "03",
                title: "Collaborative Energy",
                desc: "Brilliant ideas come from open rooms. We build together, not in silos.",
              },
              {
                id: "04",
                title: "Real Impact",
                desc: "Our work shapes reputations, moves audiences, and leaves a mark. Yours will too.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-primary/60">{item.id}</span>
                  <div className="h-px w-6 group-hover:w-10 transition-all duration-500 bg-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-foreground/55 text-sm font-body leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ──────────────────────────────────────────────────── */}
      <section id="openings" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <Asterisk className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-foreground/60 text-sm uppercase tracking-widest font-body">
              Open Positions
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Current <span className="text-primary">Openings</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/50 text-sm font-body max-w-xs"
            >
              {jobs.length} position{jobs.length !== 1 ? "s" : ""} available. Click a role to see details and apply.
            </motion.p>
          </div>

          <div className="divide-y divide-border/20 border-t border-border/20">
            {jobs.map((job, i) => (
              <JobRow key={job.id} job={job} index={i} />
            ))}
          </div>

          {/* No-match fallback */}
          {jobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Briefcase className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
              <p className="text-foreground/50 font-body">
                No open positions right now. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Speculative CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-xs uppercase tracking-widest font-mono font-bold">
              Don't See Your Role?
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-6">
              Send Us A Speculative Application
            </h2>
            <p className="text-foreground/60 text-sm font-body max-w-md mx-auto mb-10 leading-relaxed">
              If you believe you'd be a great fit for Del-York Communications but don't see a matching role, we'd still love to hear from you.
            </p>
            <a
              href="mailto:benjamin@delyorkgroup.com?subject=Speculative Application"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm font-medium hover:bg-primary/80 transition-all group"
            >
              Email Us Directly
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
};

export default Careers;
