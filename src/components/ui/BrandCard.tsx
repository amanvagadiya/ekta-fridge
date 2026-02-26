import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BrandCardProps {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  color: string;
}

const BrandCard = ({ id, name, tagline, productCount, color }: BrandCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="glass-card p-8 group cursor-pointer hover:scale-[1.02] transition-all duration-300"
      style={{ ["--brand-color" as string]: color }}
      onClick={() => navigate(`/products?brand=${id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{tagline}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
          {productCount} Products
        </span>
      </div>
      <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </button>
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}05`,
        }}
      />
    </div>
  );
};

export default BrandCard;
