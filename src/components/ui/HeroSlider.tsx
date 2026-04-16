import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, Zap } from "lucide-react";

const heroProducts = "/uploads/hero-products.jpg";
const heroAbout    = "/uploads/hero-about.jpg";
const heroContact  = "/uploads/hero-contact.jpg";

const slides = [
  {
    image: heroProducts,
    label: "New Arrivals 2025",
    title: ["Best deals on", "Premium Appliances"],
    accent: "Premium Appliances",
    subtitle: "Samsung & LG refrigerators, ACs and more — every day, unbeatable prices.",
    cta: { label: "Shop Now", to: "/products" },
    chip: "Up to 40% OFF",
  },
  {
    image: heroAbout,
    label: "Our Story",
    title: ["Trusted by thousands,", "Since Day One"],
    accent: "Day One",
    subtitle: "Genuine products, expert service, and thousands of happy families across Gujarat.",
    cta: { label: "About Us", to: "/about" },
    chip: "5000+ Happy Customers",
  },
  {
    image: heroContact,
    label: "Customer Care",
    title: ["Real help,", "Always Available"],
    accent: "Always Available",
    subtitle: "Call or WhatsApp — real humans, real answers, around the clock.",
    cta: { label: "Contact Us", to: "/contact" },
    chip: "24 / 7 Support",
  },
];

const perks = [
  { icon: Truck,        text: "2-Year Compressor Warranty" },
  { icon: ShieldCheck,  text: "1-Year Manufacturer Warranty" },
  { icon: Zap,          text: "Same-Day Installation Available" },
];

export default function HeroSliderB() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const go = useCallback((idx: number) => {
    setImgLoaded(false);
    setAnimKey((k) => k + 1);
    setCurrent(idx);
  }, []);

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;600;700;800&display=swap');

        .hero-b { font-family: 'Bricolage Grotesque', sans-serif; }

        /* image crossfade */
        @keyframes imgFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-b .bg-img { animation: imgFade 1s cubic-bezier(0.22,1,0.36,1) forwards; }

        /* text stagger */
        @keyframes wordUp {
          from { opacity: 0; transform: translateY(24px) skewY(1deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        .hero-b .stagger > * {
          animation: wordUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        .hero-b .stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .hero-b .stagger > *:nth-child(2) { animation-delay: 0.12s; }
        .hero-b .stagger > *:nth-child(3) { animation-delay: 0.19s; }
        .hero-b .stagger > *:nth-child(4) { animation-delay: 0.26s; }
        .hero-b .stagger > *:nth-child(5) { animation-delay: 0.32s; }

        /* progress dot */
        @keyframes dotGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ticker */
        @keyframes tick {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-b .ticker { animation: tick 22s linear infinite; }
        .hero-b .ticker:hover { animation-play-state: paused; }

        /* showcase strip image */
        .hero-b .showcase {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35);
        }
        .hero-b .showcase img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-b .cta-white {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 32px;
          border-radius: 14px;
          background: #fff;
          color: #0f172a;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(255,255,255,0.2);
        }
        .hero-b .cta-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,255,255,0.3);
        }
        .hero-b .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 32px;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .hero-b .cta-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.45);
        }

        .hero-b .dot-nav {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 99px;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-b .dot-nav.active { width: 32px !important; }
        .hero-b .dot-fill {
          position: absolute;
          inset: 0;
          transform-origin: left;
          border-radius: 99px;
        }
      `}</style>

      <section
        className="hero-b relative w-full overflow-hidden"
        style={{ minHeight: "100svh", background: "#080e1a" }}
      >
        {/* full-bleed background */}
        <div
          key={`bg-${animKey}`}
          className="bg-img"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0,
          }}
        />
        {/* layered overlay: dark top + dark bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,14,26,0.65) 0%, rgba(8,14,26,0.3) 40%, rgba(8,14,26,0.75) 80%, #080e1a 100%)" }} />
        {/* subtle vignette sides */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,14,26,0.5) 100%)" }} />

        {/* ── MAIN CONTENT ── */}
        <div
          className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12"
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: 96,
            paddingBottom: 120,
          }}
        >
          <div key={`text-${animKey}`} className="stagger" style={{ maxWidth: 760 }}>

            {/* label pill */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                  background: "rgba(147,197,253,0.1)",
                  border: "1px solid rgba(147,197,253,0.2)",
                  padding: "7px 16px",
                  borderRadius: 999,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: "pulse 2s infinite" }} />
                {slide.label}
                <span style={{ background: "rgba(255,255,255,0.12)", padding: "2px 8px", borderRadius: 6, fontSize: 11, marginLeft: 4 }}>
                  {slide.chip}
                </span>
              </span>
            </div>

            {/* headline */}
            <h1
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                marginBottom: 22,
              }}
            >
              {slide.title[0]}{" "}
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {slide.title[1]}
              </span>
            </h1>

            {/* subtitle */}
            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: 560,
                margin: "0 auto 36px",
              }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginBottom: 52 }}>
              <Link to={slide.cta.to} className="cta-white">
                {slide.cta.label} <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="cta-ghost">
                Get a Quote
              </Link>
            </div>

            {/* dot navigation */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`dot-nav ${i === current ? "active" : ""}`}
                  style={{
                    width: i === current ? 32 : 8,
                    height: 8,
                    border: "none",
                    background: i === current ? "transparent" : "rgba(255,255,255,0.25)",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  aria-label={`Slide ${i + 1}`}
                >
                  {i === current && (
                    <span
                      key={`df-${animKey}`}
                      className="dot-fill"
                      style={{ background: "#60a5fa", animation: "dotGrow 6s linear forwards" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* showcase image strip */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="showcase"
                style={{
                  aspectRatio: "16/9",
                  cursor: "pointer",
                  opacity: i === current ? 1 : 0.45,
                  transform: i === current ? "scale(1.03)" : "scale(1)",
                  transition: "opacity 0.4s, transform 0.4s",
                  outline: i === current ? "2px solid rgba(96,165,250,0.7)" : "none",
                  outlineOffset: 2,
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                aria-label={s.title[0]}
              >
                <img src={s.image} alt={s.title[0]} loading={i === 0 ? "eager" : "lazy"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── PERKS TICKER ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            background: "rgba(8,14,26,0.85)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            height: 44,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="ticker" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
            {[...perks, ...perks, ...perks, ...perks].map((p, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 28px" }}>
                <p.icon size={13} color="#60a5fa" />
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{p.text}</span>
                <span style={{ color: "rgba(255,255,255,0.15)", marginLeft: 16 }}>✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* arrow controls */}
        {[
          { dir: "prev", fn: prev, side: { left: 16 }, icon: <ChevronLeft size={20} /> },
          { dir: "next", fn: next, side: { right: 16 }, icon: <ChevronRight size={20} /> },
        ].map((a) => (
          <button
            key={a.dir}
            onClick={a.fn}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s",
              ...a.side,
            }}
            aria-label={a.dir}
          >
            {a.icon}
          </button>
        ))}
      </section>
    </>
  );
}
