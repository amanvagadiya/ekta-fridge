import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroProducts from "@/assets/hero-products.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import samsungLogo from "@/assets/samsung-logo.png";
import lgLogo from "@/assets/lg-logo.png";

const slides = [
  {
    image: heroProducts,
    title: "Shop Premium Appliances",
    subtitle: "Samsung & LG refrigerators, ACs and more—best deals every day.",
  },
  {
    image: heroAbout,
    title: "Trusted Since Day One",
    subtitle: "Quality service and genuine products for thousands of happy customers.",
  },
  {
    image: heroContact,
    title: "Need Help? We're Here",
    subtitle: "Reach out on WhatsApp or call us – 24/7 customer support.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent((i) => (i + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight">
          {slide.title}
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
          {slide.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/products?brand=samsung"
            className="btn-primary inline-flex items-center gap-2 !px-8 !py-4 !text-base"
          >
            <img src={samsungLogo} alt="Samsung" className="h-5" />
            Shop Samsung
          </Link>
          <Link
            to="/products?brand=lg"
            className="btn-outline inline-flex items-center gap-2 !px-8 !py-4 !text-base"
          >
            <img src={lgLogo} alt="LG" className="h-5" />
            Shop LG
          </Link>
        </div>
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/70 flex items-center justify-center hover:bg-background/90 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/70 flex items-center justify-center hover:bg-background/90 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-primary" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
