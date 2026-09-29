import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const WorkWithUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="connect" className="py-24 lg:py-36 bg-[#080808] text-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#ED1C24]" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold font-body">
              LET'S COLLABORATE
            </span>
          </div>

          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
            WORK WITH <span className="text-[#ED1C24]">US</span>
          </h2>

          <p className="mt-4 text-neutral-400 text-base md:text-lg font-body max-w-xl">
            Let's build bold communications, stronger brands and meaningful impact together.
          </p>
        </div>

        {/* Form Container */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 rounded-2xl bg-neutral-900 border border-neutral-800 text-center flex flex-col items-center justify-center gap-4"
          >
            <CheckCircle2 className="w-16 h-16 text-[#ED1C24]" />
            <h3 className="font-heading text-3xl font-bold uppercase">THANK YOU!</h3>
            <p className="text-neutral-300 font-body text-base max-w-md">
              Your message has been received. Our team will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", projectType: "", message: "" });
              }}
              className="mt-4 px-6 py-2 rounded-full border border-neutral-700 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Send Another Enquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-body uppercase font-bold tracking-widest text-neutral-300">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-500 font-body focus:outline-none focus:border-[#ED1C24] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-body uppercase font-bold tracking-widest text-neutral-300">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-500 font-body focus:outline-none focus:border-[#ED1C24] transition-colors"
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-body uppercase font-bold tracking-widest text-neutral-300">
                PROJECT TYPE
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#0E0E0E] border-b border-neutral-700 py-3 text-white placeholder-neutral-500 font-body focus:outline-none focus:border-[#ED1C24] transition-colors appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="ecco">Embedded Creative Communications Office (ECCO)</option>
                <option value="eip">Executive Influence Programme (EIP)</option>
                <option value="events">Experiential & Corporate Events</option>
                <option value="creative-economy">Creative Economy Communications</option>
                <option value="partnership">Partnership Engagement</option>
                <option value="pm">Project Management</option>
                <option value="branding">Branding</option>
                <option value="video">Video Production</option>
                <option value="other">General Enquiry</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-body uppercase font-bold tracking-widest text-neutral-300">
                MESSAGE
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-500 font-body focus:outline-none focus:border-[#ED1C24] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ED1C24] text-white font-heading font-bold text-lg uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-lg group"
              >
                <span>SEND ENQUIRY</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default WorkWithUsSection;
