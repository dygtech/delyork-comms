import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" alt="Dyc logo" className="w-12 h-12" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["The Company", "The Work", "The Thinking", "The Connect"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-foreground/80 hover:text-primary transition-colors font-body text-sm flex items-center gap-1"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#"
            className="bg-secondary text-foreground px-6 py-2.5 rounded-full text-sm font-body hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Let's Talk
          </a>
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
              {["About", "Services", "Blog", "Contact"].map((item) => (
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
