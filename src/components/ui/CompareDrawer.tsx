import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  specs: string[];
}

interface CompareDrawerProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CompareDrawer = ({ products, onRemove, onClear }: CompareDrawerProps) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 shadow-2xl animate-slide-down">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              Compare ({products.length}/3):
            </span>
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm text-foreground whitespace-nowrap"
              >
                {p.name.slice(0, 25)}...
                <button onClick={() => onRemove(p.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={onClear} className="btn-outline !py-2 !px-4 !text-xs">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
