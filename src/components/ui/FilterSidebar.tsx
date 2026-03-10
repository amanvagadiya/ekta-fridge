import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    search: string;
    brands: string[];
    categories: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    minRating: number;
  };
  onFiltersChange: (filters: FilterSidebarProps["filters"]) => void;
  showCapacity: boolean;
}

const FilterSidebar = ({ filters, onFiltersChange, showCapacity }: FilterSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleBrand = (brand: string) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands });
  };

  const toggleCategory = (cat: string) => {
    const categories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFiltersChange({ ...filters, categories });
  };

  const clearAll = () => {
    setSearch("");
    onFiltersChange({
      search: "",
      brands: [],
      categories: [],
      minPrice: 5000,
      maxPrice: 150000,
      sortBy: "",
      minRating: 0,
    });
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

  const content = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className={`${inputClass} pl-10`} />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Brand</label>
        <div className="space-y-2">
          {["samsung", "lg"].map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground capitalize transition-colors">
                {brand === "samsung" ? "Samsung" : "LG"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Category</label>
        <div className="space-y-2">
          {[
            { id: "ac", label: "Air Conditioner" },
            { id: "air-cooler", label: "Air Cooler" },
            { id: "washing-machine", label: "Washing Machine" },
            { id: "microwave", label: "Microwave" },
            { id: "fridge", label: "Refrigerator" },
            { id: "freezer", label: "Freezer" },
          ].map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={filters.categories.includes(cat.id)} onChange={() => toggleCategory(cat.id)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
          Max Price: ₹{filters.maxPrice.toLocaleString()}
        </label>
        <input type="range" min={5000} max={150000} step={5000} value={filters.maxPrice} onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })} className="w-full accent-primary" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹5,000</span>
          <span>₹1,50,000</span>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Sort By</label>
        <select value={filters.sortBy} onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })} className={inputClass}>
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">Min Rating</label>
        <div className="space-y-2">
          {[0, 3, 4, 5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rating" checked={filters.minRating === r} onChange={() => onFiltersChange({ ...filters, minRating: r })} className="w-4 h-4 border-border text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {r === 0 ? "All" : `${r}★ & above`}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={clearAll} className="w-full py-2.5 text-sm font-semibold rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-6 left-6 z-40 btn-primary flex items-center gap-2 !rounded-full shadow-lg">
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      <div className="hidden lg:block w-72 shrink-0">
        <div className="premium-card p-5 sticky top-24">{content}</div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-background border-r border-border p-5 overflow-y-auto animate-slide-down">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-foreground">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
