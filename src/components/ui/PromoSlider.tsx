import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import promo1 from "@/assets/promo-banner-1.jpg";
import promo2 from "@/assets/promo-banner-2.jpg";
import promo3 from "@/assets/promo-banner-3.jpg";

const banners = [
  { image: promo1, alt: "Summer Sale - Up to 40% OFF on ACs" },
  { image: promo2, alt: "Mega Deals on Washing Machines & Refrigerators" },
  { image: promo3, alt: "Premium Kitchen Appliances Offer" },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <div className="relative aspect-[16/6] md:aspect-[16/5] overflow-hidden">
        {banners.map((banner, i) => (
          <img
            key={i}
            src={banner.image}
            alt={banner.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((p) => (p - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((p) => (p + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border shadow-md flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
            }`}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
