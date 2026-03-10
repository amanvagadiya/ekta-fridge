import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  specs: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onCompare?: (product: Product) => void;
  isComparing?: boolean;
}

const ProductCard = ({ product, onCompare, isComparing }: ProductCardProps) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="premium-card group overflow-hidden hover:-translate-y-1">
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>
        <span
          className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
            product.brand === "samsung"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.brand}
        </span>
      </div>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2 line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.specs.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 text-[10px] rounded-full bg-secondary text-muted-foreground"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-500 fill-amber-500"
                    : "text-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-heading font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-2">
          {onCompare && (
            <button
              onClick={() => onCompare(product)}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                isComparing
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {isComparing ? "Comparing" : "Compare"}
            </button>
          )}
          <Link to={`/product/${product.id}`} className="flex-1 btn-primary !py-2.5 !text-xs !rounded-xl text-center">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
