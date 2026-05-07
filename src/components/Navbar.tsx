import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-heading font-bold text-primary-foreground text-lg">D</span>
          </div>
          <span className="font-heading font-bold text-foreground text-xl">DYC.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["About", "Services", "Blog", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-foreground/80 hover:text-primary transition-colors font-body text-sm flex items-center gap-1"
            >
              {item}
              {/* {["Home", "Pages", "Services", "Blog"].includes(item) && (
                <ChevronDown className="w-3.5 h-3.5" />
              )} */}
            </a>
          ))}
        </div>

        {/* CTA + Grid */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#"
            className="bg-secondary text-foreground px-6 py-2.5 rounded-full text-sm font-body hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Let's Talk
          </a>
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors">
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-foreground/60" />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background border-t border-border/30"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {["Home", "Pages", "Services", "Blog", "Contact"].map((item) => (
                <a key={item} href="#" className="text-foreground/80 text-sm font-body">
                  {item}
                </a>
              ))}
              <a href="#" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-body text-center">
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
