import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promo1 = "/uploads/promo-banner-1.jpg";
const promo2 = "/uploads/promo-banner-2.jpg";
const promo3 = "/uploads/promo-banner-3.jpg";

const banners = [
  { image: promo1, alt: "Summer Sale - Up to 40% OFF on ACs" },
  { image: promo2, alt: "Mega Deals on Washing Machines & Refrigerators" },
  { image: promo3, alt: "Premium Kitchen Appliances Offer" },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((p) => (p + 1) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((p) => (p - 1 + banners.length) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden group w-full animate-in fade-in-0 duration-1000">
      <div className="relative aspect-video sm:aspect-[16/7] md:aspect-[16/5] lg:aspect-[16/4.5] overflow-hidden w-full">
        {banners.map((banner, i) => (
          <img
            key={i}
            src={banner.image}
            alt={banner.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
              i === current
                ? "opacity-100 scale-100 animate-in slide-in-from-right-5"
                : "opacity-0 scale-105"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out hover:scale-125 ${
              i === current
                ? "w-8 bg-primary-foreground shadow-lg animate-in zoom-in-50"
                : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70"
            } disabled:cursor-not-allowed`}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
