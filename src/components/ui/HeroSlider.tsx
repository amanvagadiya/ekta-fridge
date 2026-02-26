import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    badge: "Summer Sale",
    title: "Cool Your World",
    subtitle: "Up to 40% OFF on premium Air Conditioners from Samsung & LG",
    gradient: "from-blue-900/80 via-background/60 to-background/90",
  },
  {
    badge: "Smart Living",
    title: "Smart Living Starts Here",
    subtitle: "Discover Samsung's range of AI-powered smart appliances",
    gradient: "from-cyan-900/80 via-background/60 to-background/90",
  },
  {
    badge: "Innovation",
    title: "Power of LG Innovation",
    subtitle: "Experience cutting-edge technology with LG's award-winning products",
    gradient: "from-indigo-900/80 via-background/60 to-background/90",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="star-field" />
      <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient} transition-all duration-700`} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl animate-fade-up" key={current}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
            {slides[current].badge}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
            {slides[current].subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <a href="#brands" className="btn-outline">
              View Brands
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
