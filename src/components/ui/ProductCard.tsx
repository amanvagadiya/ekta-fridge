import { Star, Heart } from "lucide-react";

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
    <div className="glass-card group overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
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
          className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
            product.brand === "samsung"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {product.brand}
        </span>
        <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Specs */}
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

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-heading font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onCompare?.(product)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
              isComparing
                ? "bg-primary/20 border-primary/30 text-primary"
                : "border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary"
            }`}
          >
            {isComparing ? "Comparing" : "Compare"}
          </button>
          <button className="flex-1 btn-primary !py-2 !text-xs">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
