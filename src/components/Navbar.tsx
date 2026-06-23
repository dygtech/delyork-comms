import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Our Company", href: "#about" },
  { label: "Our Work", href: "/works", isPage: true },
  { label: "Our Strategy", href: "#services" },
  { label: "Our Partners", href: "#partners" },
  { label: "Careers", href: "/careers", isPage: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["about", "portfolio", "services", "partners"];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger active states near the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  /**
   * Handles nav link clicks. If we're already on the homepage, smooth-scroll
   * to the target section. If we're on a detail page, navigate home first
   * and pass the target hash so the homepage can scroll to it on mount.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (isHomePage) {
      // Already on homepage — just scroll to the section
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On a detail page — navigate to homepage with the hash
      navigate("/" + href);
    }

    setMobileOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
          <img src="/logo.png" alt="Dyc logo" className="w-12 h-12" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            if ((item as any).isPage) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors font-body text-sm flex items-center gap-1 ${location.pathname === item.href
                    ? "text-primary font-bold"
                    : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              );
            }
            const isActive = isHomePage && activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`transition-colors font-body text-sm flex items-center gap-1 ${isActive
                  ? "text-primary font-bold"
                  : "text-foreground/80 hover:text-primary"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#connect"
            onClick={(e) => handleNavClick(e, "#connect")}
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
              {navItems.map((item) => {
                if ((item as any).isPage) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-sm font-body transition-colors ${location.pathname === item.href
                        ? "text-primary font-bold"
                        : "text-foreground/80"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
                const isActive = isHomePage && activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-body transition-colors ${isActive
                      ? "text-primary font-bold"
                      : "text-foreground/80"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#connect"
                onClick={(e) => handleNavClick(e, "#connect")}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-body text-center"
              >
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
