import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BrandCardProps {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  color: string;
}

const BrandCard = ({ id, name, tagline, productCount }: BrandCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="premium-card-elevated p-8 group cursor-pointer hover:scale-[1.02]"
      onClick={() => navigate(`/products?brand=${id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{tagline}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
          {productCount} Products
        </span>
      </div>
      <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BrandCard;
