import { useState } from "react";
import { X, Star, ArrowLeftRight } from "lucide-react";

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
  image: string;
  inStock: boolean;
}

interface CompareDrawerProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CompareDrawer = ({ products, onRemove, onClear }: CompareDrawerProps) => {
  const [showTable, setShowTable] = useState(false);

  if (products.length === 0) return null;

  return (
    <>
      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                Compare ({products.length}/3):
              </span>
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm text-foreground whitespace-nowrap border border-border">
                  {p.name.slice(0, 25)}...
                  <button onClick={() => onRemove(p.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={onClear} className="btn-outline !py-2 !px-4 !text-xs">Clear</button>
              {products.length >= 2 && (
                <button onClick={() => setShowTable(true)} className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Compare Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen comparison modal */}
      {showTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowTable(false)} />
          <div className="relative bg-background rounded-2xl border border-border shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-auto m-4">
            <div className="sticky top-0 bg-background z-10 flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-heading text-xl font-bold text-foreground">Product Comparison</h2>
              <button onClick={() => setShowTable(false)} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold uppercase tracking-wide text-xs w-36">Feature</th>
                    {products.map((p) => (
                      <th key={p.id} className="text-center py-3 px-4 min-w-[200px]">
                        <div className="space-y-2">
                          <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl mx-auto border border-border" />
                          <p className="font-heading font-semibold text-foreground text-sm">{p.name}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <CompareRow label="Brand" values={products.map((p) => <span className="capitalize font-medium">{p.brand}</span>)} />
                  <CompareRow label="Category" values={products.map((p) => <span className="capitalize">{p.category.replace("-", " ")}</span>)} />
                  <CompareRow label="Price" values={products.map((p) => <span className="font-bold text-primary">₹{p.price.toLocaleString()}</span>)} />
                  <CompareRow label="Original Price" values={products.map((p) => <span className="line-through text-muted-foreground">₹{p.originalPrice.toLocaleString()}</span>)} />
                  <CompareRow
                    label="Rating"
                    values={products.map((p) => (
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(p.rating) ? "text-amber-500 fill-amber-500" : "text-border"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{p.rating}</span>
                      </div>
                    ))}
                  />
                  <CompareRow label="Reviews" values={products.map((p) => <span>{p.reviews} reviews</span>)} />
                  <CompareRow
                    label="Specs"
                    values={products.map((p) => (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {p.specs.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border">{s}</span>
                        ))}
                      </div>
                    ))}
                  />
                  <CompareRow
                    label="Availability"
                    values={products.map((p) => (
                      <span className={`text-xs font-semibold ${p.inStock ? "text-green-600" : "text-destructive"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    ))}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CompareRow = ({ label, values }: { label: string; values: React.ReactNode[] }) => (
  <tr className="hover:bg-secondary/30 transition-colors">
    <td className="py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wide">{label}</td>
    {values.map((v, i) => (
      <td key={i} className="py-3 px-4 text-center text-foreground">{v}</td>
    ))}
  </tr>
);

export default CompareDrawer;
