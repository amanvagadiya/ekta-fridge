import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Filter, RotateCcw } from "lucide-react";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";

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

const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search });
    }, 250);
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

  const sectionClass = "rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm";
  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

  const content = (
    <div className="space-y-4">
      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 block">Brand</label>
        <div className="grid grid-cols-1 gap-2">
          {brandsData.map((brand) => (
            <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.id)}
                onChange={() => toggleBrand(brand.id)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700 capitalize">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 block">Category</label>
        <div className="grid grid-cols-1 gap-2">
          {categoriesData.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
          Max Price: Rs.{filters.maxPrice.toLocaleString()}
        </label>
        <input
          type="range"
          min={5000}
          max={150000}
          step={5000}
          value={filters.maxPrice}
          onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>Rs.5,000</span>
          <span>Rs.1,50,000</span>
        </div>
      </div>

      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
          className={inputClass}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className={sectionClass}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Min Rating</label>
        <div className="space-y-2">
          {[0, 3, 4, 5].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => onFiltersChange({ ...filters, minRating: r })}
                className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">{r === 0 ? "All" : `${r} star & above`}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={clearAll}
        className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Clear All Filters
      </button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      <div className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-24 rounded-3xl border border-slate-200 bg-gradient-to-b from-blue-50 to-slate-100 p-4 shadow-xl max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
          <div className="mb-3 inline-flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Filter className="w-4 h-4" />
            Filter Products
          </div>
          {content}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-100 p-4 overflow-y-auto animate-slide-down">
            <div className="sticky top-0 z-10 mb-4 rounded-2xl border border-slate-200 bg-white/95 p-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-slate-800 font-semibold">
                  <Filter className="w-4 h-4" />
                  Filter Products
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
