import { useNavigate } from "react-router-dom";
import { Wind, Waves, Zap, Thermometer, Snowflake, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Wind, Waves, Zap, Thermometer, Snowflake,
};

interface CategoryCardProps {
  id: string;
  label: string;
  icon: string;
  count: number;
}

const CategoryCard = ({ id, label, icon, count }: CategoryCardProps) => {
  const navigate = useNavigate();
  const Icon = iconMap[icon] || Zap;

  return (
    <button
      onClick={() => navigate(`/products?category=${id}`)}
      className="premium-card p-6 flex flex-col items-center gap-3 group hover:border-primary/30 hover:scale-105 cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-sm text-foreground text-center">{label}</h3>
      <span className="text-xs text-muted-foreground">{count} Products</span>
    </button>
  );
};

export default CategoryCard;
