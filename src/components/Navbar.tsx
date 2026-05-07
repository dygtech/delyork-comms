import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-heading font-bold text-primary-foreground text-lg">D</span>
            </div>
            <span className="font-heading font-bold text-foreground text-xl">DYC.</span>
          </a>

          {/* CTA + Grid */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              className="bg-secondary text-foreground px-6 py-2.5 rounded-full text-sm font-body hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Let's Talk
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors group"
            >
              <div className="grid grid-cols-3 gap-0.5 group-hover:rotate-90 transition-transform duration-300">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-foreground/60" />
                ))}
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Premium Fullscreen Menu - Now a sibling to prevent parent interference */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
