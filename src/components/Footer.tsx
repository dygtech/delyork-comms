import { ArrowUpRight } from "lucide-react";
import TalkMarquee from "./TalkMarquee";



const quickLinks = [
  { label: "How It Works", href: "#portfolio" },
  { label: "Get To Know Us", href: "#about" },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30 py-16 pb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Subscribe Our Newsletter!</h3>
            <div className="flex items-center bg-card rounded-full overflow-hidden border border-border/30">
              <input
                type="email"
                placeholder="Enter e-mail"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none font-body"
              />
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-1 hover:bg-primary/80 transition-colors flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <p className="text-foreground/40 text-xs mt-8">Copyright© {new Date().getFullYear()} Del-york Technologies</p>
            <div className="flex gap-4 mt-4">
              {["f", "𝕏", "📷", "P"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-foreground/40 hover:text-primary transition-colors text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-foreground/60 hover:text-primary text-sm transition-colors font-body">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-6">Contact</h3>
            <p className="text-foreground/60 text-sm leading-relaxed font-body">
              3, Sapara Williams, <br />
              Victoria Island Lagos Nigeria.
            </p>
            <p className="font-heading text-2xl font-bold mt-4">+234 913 377 7740</p>
            <p className="text-foreground/60 text-sm mt-2 font-body">benjamin@delyorkgroup.com</p>
          </div>
        </div>
      </div>

      {/* Large Let's Talk Marquee */}
      <TalkMarquee />
    </footer>
  );
};

export default Footer;
