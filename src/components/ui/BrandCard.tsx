import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const brandLogos: Record<string, string> = {
  samsung: "/uploads/samsung-logo.png",
  lg: "/uploads/lg-logo.png",
  whirlpool: "/uploads/whirlpool-logo.svg",
  daikin: "/uploads/daikin-logo.png",
  panasonic: "/uploads/panasonic-logo.svg",
  voltas: "/uploads/voltas-logo.png",
};

interface BrandCardProps {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  color: string;
}

const BrandCard = ({ id, name, tagline, productCount, color }: BrandCardProps) => {
  const navigate = useNavigate();
  const logo = brandLogos[id];

  return (
    <div
      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
      onClick={() => navigate(`/products?brand=${id}`)}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2" style={{ backgroundColor: color }} />

      <div className="p-8 pt-10">
        <div className="mb-6 h-20 flex items-center justify-center">
          {logo ? (
            <img src={logo} alt={name} className="h-14 w-auto object-contain" loading="lazy" decoding="async" />
          ) : (
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: color }}>
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">{tagline}</p>

        <div className="flex items-center justify-between">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary text-muted-foreground border border-border">
            {productCount} Products
          </span>
          <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
