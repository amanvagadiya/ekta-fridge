import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import samsungLogo from "@/assets/samsung-logo.png";
import lgLogo from "@/assets/lg-logo.png";

interface BrandCardProps {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  color: string;
}

const BrandCard = ({ id, name, tagline, productCount }: BrandCardProps) => {
  const navigate = useNavigate();
  const isSamsung = id === "samsung";

  return (
    <div
      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
      onClick={() => navigate(`/products?brand=${id}`)}
    >
      {/* Accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${isSamsung ? 'bg-blue-500' : 'bg-red-500'} transition-all duration-300 group-hover:h-2`} />
      
      <div className="p-8 pt-10">
        {/* Logo */}
        <div className="mb-6 h-20 flex items-center justify-center">
          <img 
            src={isSamsung ? samsungLogo : lgLogo} 
            alt={name} 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground mb-6 leading-relaxed">{tagline}</p>

        {/* Bottom row */}
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
