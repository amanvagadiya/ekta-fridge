import { useState } from "react";
import { X, Star, ArrowLeftRight, MessageCircle } from "lucide-react";

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
  modelCode?: string;
  capacity?: string | number;
}

interface CompareDrawerProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const getStarRatingFromName = (name: string) => {
  const match = name.match(/(\d)\s*-?\s*Star/i);
  return match ? `${match[1]} Star` : "N/A";
};

const getWarrantyInfo = (category: string) => {
  switch (category) {
    case "fridge":
    case "freezer":
      return "1 Year Product, 10 Years Compressor";
    case "ac":
      return "1 Year General, 5 Years Compressor";
    case "washing-machine":
      return "2 Years Product, 10 Years Motor";
    case "air-cooler":
      return "1 Year Manufacturer Warranty";
    case "microwave":
      return "1 Year Product, 3 Years Magnetron";
    default:
      return "1 Year Manufacturer Warranty";
  }
};

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
              <h2 className="font-heading text-xl font-bold text-foreground">Detailed Product Comparison</h2>
              <button onClick={() => setShowTable(false)} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold uppercase tracking-wide text-xs w-36">Specifications</th>
                    {products.map((p) => (
                      <th key={p.id} className="text-center py-3 px-4 min-w-[200px] vertical-align-top">
                        <div className="space-y-2">
                          <img src={p.image} alt={p.name} className="w-20 h-20 object-contain rounded-xl mx-auto border border-border p-1 bg-transparent" />
                          <p className="font-heading font-semibold text-foreground text-sm line-clamp-2 h-10">{p.name}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <CompareRow label="Brand" values={products.map((p) => <span className="capitalize font-medium">{p.brand}</span>)} />
                  <CompareRow label="Model Code" values={products.map((p) => <span className="font-mono text-xs text-foreground bg-secondary/50 px-2 py-0.5 rounded border border-border">{p.modelCode || "N/A"}</span>)} />
                  <CompareRow label="Category" values={products.map((p) => <span className="capitalize">{p.category.replace("-", " ")}</span>)} />
                  <CompareRow
                    label="Capacity"
                    values={products.map((p) => {
                      const cap = p.capacity;
                      if (!cap) return <span className="text-muted-foreground">-</span>;
                      return <span className="font-semibold text-foreground">{cap} {typeof cap === "number" ? "Liters" : ""}</span>;
                    })}
                  />
                  <CompareRow
                    label="Energy Rating"
                    values={products.map((p) => {
                      const rating = getStarRatingFromName(p.name);
                      if (rating === "N/A") return <span className="text-muted-foreground">-</span>;
                      return (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                          ⭐ {rating}
                        </span>
                      );
                    })}
                  />
                  <CompareRow label="Warranty" values={products.map((p) => <span className="text-xs text-foreground">{getWarrantyInfo(p.category)}</span>)} />
                  <CompareRow
                    label="Price"
                    values={products.map((p) => (
                      <div className="space-y-1">
                        <span className="font-bold text-primary text-base">₹{p.price.toLocaleString()}</span>
                        <div className="text-xs text-muted-foreground line-through">₹{p.originalPrice.toLocaleString()}</div>
                      </div>
                    ))}
                  />
                  <CompareRow
                    label="Rating"
                    values={products.map((p) => (
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(p.rating) ? "text-amber-500 fill-amber-500" : "text-border"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-semibold">{p.rating} ({p.reviews})</span>
                      </div>
                    ))}
                  />
                  <CompareRow
                    label="Key Specs"
                    values={products.map((p) => (
                      <div className="flex flex-wrap gap-1 justify-center max-w-[220px] mx-auto">
                        {p.specs.slice(0, 4).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-secondary border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    ))}
                  />
                  <CompareRow
                    label="Availability"
                    values={products.map((p) => (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.inStock ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    ))}
                  />
                  <CompareRow
                    label="Action"
                    values={products.map((p) => (
                      <button
                        onClick={() => {
                          const msg = `Hello EKTA FRIDGE!\n\nI'd like to inquire about this product from the Compare list:\n- ${p.name}\n- Model: ${p.modelCode || "N/A"}\n- Price: Rs.${p.price.toLocaleString()}\n\nLink: ${window.location.origin}/product/${p.id}`;
                          window.open(`https://wa.me/918128551508?text=${encodeURIComponent(msg)}`, "_blank");
                        }}
                        className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-150 flex items-center justify-center gap-1.5 mx-auto whitespace-nowrap"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Inquiry
                      </button>
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
    <td className="py-4 px-4 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{label}</td>
    {values.map((v, i) => (
      <td key={i} className="py-4 px-4 text-center text-foreground">{v}</td>
    ))}
  </tr>
);

export default CompareDrawer;
