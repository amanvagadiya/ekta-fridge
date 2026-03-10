import { useNavigate } from "react-router-dom";
import categoryAc from "@/assets/category-ac.jpg";
import categoryWashing from "@/assets/category-washing.jpg";
import categoryMicrowave from "@/assets/category-microwave.jpg";
import categoryFridge from "@/assets/category-fridge.jpg";
import categoryFreezer from "@/assets/category-freezer.jpg";

const imageMap: Record<string, string> = {
  ac: categoryAc,
  "air-cooler": categoryAc, // temporary use AC image
  "washing-machine": categoryWashing,
  microwave: categoryMicrowave,
  fridge: categoryFridge,
  freezer: categoryFreezer,
};

interface CategoryCardProps {
  id: string;
  label: string;
  icon: string;
  count: number;
}

const CategoryCard = ({ id, label, count }: CategoryCardProps) => {
  const navigate = useNavigate();
  const image = imageMap[id];

  return (
    <button
      onClick={() => navigate(`/products?category=${id}`)}
      className="premium-card overflow-hidden group hover:border-primary/30 hover:scale-[1.03] cursor-pointer transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading font-semibold text-sm text-foreground">{label}</h3>
        <span className="text-xs text-muted-foreground">{count} Products</span>
      </div>
    </button>
  );
};

export default CategoryCard;
