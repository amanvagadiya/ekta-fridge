import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Snowflake, Cpu, Award } from "lucide-react";

const slides = [
  {
    badge: "Summer Sale",
    title: "Cool Your World",
    highlight: "This Summer",
    subtitle: "Up to 40% OFF on premium Air Conditioners from Samsung & LG",
    icon: Snowflake,
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    accentColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    badge: "Smart Living",
    title: "Smart Living",
    highlight: "Starts Here",
    subtitle: "Discover Samsung's range of AI-powered smart appliances for modern homes",
    icon: Cpu,
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    accentColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    badge: "Innovation",
    title: "Power of LG",
    highlight: "Innovation",
    subtitle: "Experience cutting-edge technology with LG's award-winning products",
    icon: Award,
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
    accentColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const slide = slides[current];
  const SlideIcon = slide.icon;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000`} />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-up" key={`content-${current}`}>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-border bg-background shadow-sm mb-8`}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {slide.badge}
            </span>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground leading-[1.05] tracking-tight mb-2">
              {slide.title}
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold gradient-text leading-[1.05] tracking-tight mb-8">
              {slide.highlight}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed">
              {slide.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 !px-8 !py-4 !text-base shadow-lg shadow-primary/20">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#brands" className="btn-outline inline-flex items-center gap-2 !px-8 !py-4 !text-base">
                View Brands
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <p className="font-heading font-bold text-foreground text-xl">50K+</p>
                <p className="text-xs text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-heading font-bold text-foreground text-xl">200+</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="font-heading font-bold text-foreground text-xl">10+</p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:flex items-center justify-center" key={`visual-${current}`}>
            <div className="relative animate-fade-up">
              {/* Large icon card */}
              <div className="w-80 h-80 rounded-3xl bg-background border border-border shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
                <SlideIcon className={`w-32 h-32 ${slide.accentColor} relative z-10`} strokeWidth={1} />
              </div>
              
              {/* Floating card top-right */}
              <div className="absolute -top-6 -right-6 px-5 py-3 rounded-2xl bg-background border border-border shadow-lg animate-float">
                <p className="text-xs text-muted-foreground">Up to</p>
                <p className="font-heading font-bold text-2xl text-primary">40% OFF</p>
              </div>
              
              {/* Floating card bottom-left */}
              <div className="absolute -bottom-4 -left-8 px-5 py-3 rounded-2xl bg-background border border-border shadow-lg" style={{ animationDelay: '1s', animation: 'float 3s ease-in-out infinite 1s' }}>
                <p className="text-xs text-muted-foreground">Trusted by</p>
                <p className="font-heading font-bold text-lg text-foreground">50,000+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/30 transition-all hover:shadow-lg"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/30 transition-all hover:shadow-lg"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-primary shadow-sm shadow-primary/30" : "w-2.5 bg-foreground/15 hover:bg-foreground/25"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
