import { Link } from "react-router-dom";
import { Zap, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">
                Electra<span className="text-primary">Zone</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Your trusted destination for premium Samsung & LG electronics. Quality, affordability, and service — all in one place.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: MessageCircle, href: "https://wa.me/919876543210" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Products", path: "/products" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Air Conditioner", cat: "ac" },
                { label: "Washing Machine", cat: "washing-machine" },
                { label: "Microwave", cat: "microwave" },
                { label: "Refrigerator", cat: "fridge" },
                { label: "Freezer", cat: "freezer" },
              ].map((item) => (
                <li key={item.cat}>
                  <Link
                    to={`/products?category=${item.cat}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>123 Electronics Hub, MG Road, Ahmedabad, Gujarat - 380001</li>
              <li>
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91-98765-43210
                </a>
              </li>
              <li>
                <a href="mailto:support@electrazone.com" className="hover:text-primary transition-colors">
                  support@electrazone.com
                </a>
              </li>
              <li>Mon–Sat: 9AM–8PM, Sun: 10AM–6PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2025 ElectraZone. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
