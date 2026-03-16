import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Home, Info, Package, Phone } from "lucide-react";

const logo = "/uploads/logo.png";
const whatsappUrl = "https://wa.me/918128551508?text=Hello%20EKTA%20FRIDGE!%20I%20need%20help.";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "About Us", path: "/about", icon: Info },
  { label: "Products", path: "/products", icon: Package },
  { label: "Contact Us", path: "/contact", icon: Phone },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes navItemIn {
          from { transform: translateX(-24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .sidebar-panel {
          animation: slideIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .backdrop-fade {
          animation: fadeIn 0.25s ease forwards;
        }
        .nav-item-animate {
          animation: navItemIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary/10 backdrop-blur-md border-b border-primary/20 shadow-sm"
            : "bg-secondary/90 backdrop-blur-sm border-b border-border/60"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="EKTA FRIDGE" className="h-10 w-10 object-contain" loading="eager" decoding="async" />
            <span className="font-heading text-xl font-bold text-foreground">EKTA FRIDGE</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" style={{ isolation: "isolate" }}>
          
          {/* Backdrop */}
          <div
            className="backdrop-fade absolute inset-0"
            style={{ background: "rgba(0, 0, 0, 0.65)", backdropFilter: "blur(4px)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar Panel */}
          <div
            className="sidebar-panel absolute top-0 left-0 bottom-0 flex flex-col bg-secondary/95"
            style={{
              width: "78vw",
              maxWidth: "320px",
              background: "",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "8px 0 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 50,
                    height: 50,
                    background: "rgba(255,255,255,0.06)",
                    border: "2px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img src={logo} alt="EKTA FRIDGE" className="h-7 w-7 object-contain" />
                </div>
                <div>
                  <div className="text-black font-bold text-sm leading-tight">EKTA FRIDGE</div>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-lg transition-colors text-black"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="nav-item-animate flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-black"
                    style={{
                      animationDelay: `${i * 60 + 80}ms`,
                      background: isActive
                        ? "rgba(58, 131, 248, 0.15)"
                        : "rgba(159, 179, 210, 0.15)",
                      border: isActive
                        ? "1px solid rgba(59, 130, 246, 0.3)"
                        : "1px solid transparent",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                      }
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        width: 34,
                        height: 34,
                        background: isActive
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(255,255,255,0.06)",
                        border: isActive
                          ? "1px solid rgba(59, 130, 246, 0.25)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{link.label}</span>
                    {isActive && (
                      <div
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: "#60a5fa" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Footer — WhatsApp */}
            <div
              className="px-4 py-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
             <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  boxShadow: "0 4px 16px rgba(22, 163, 74, 0.3)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </a>
              <p
                className="text-center text-xs mt-3 text-black"
              >
                © 2021 EKTA FRIDGE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;