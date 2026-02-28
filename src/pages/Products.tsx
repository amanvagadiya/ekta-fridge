import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/ui/FilterSidebar";
import CompareDrawer from "@/components/ui/CompareDrawer";
import PageHero from "@/components/ui/PageHero";
import productsData from "@/data/products.json";

type Product = (typeof productsData)[0];

const Products = () => {
  const [searchParams] = useSearchParams();

  const initialBrands = searchParams.get("brand") ? [searchParams.get("brand")!] : [];
  const initialCategories = searchParams.get("category") ? [searchParams.get("category")!] : [];

  const [filters, setFilters] = useState({
    search: "",
    brands: initialBrands,
    categories: initialCategories,
    minPrice: 5000,
    maxPrice: 150000,
    sortBy: "",
    minRating: 0,
  });

  const [compareList, setCompareList] = useState<Product[]>([]);

  const showCapacity = filters.categories.some((c) => c === "fridge" || c === "freezer");

  const filtered = useMemo(() => {
    let items = [...productsData];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.brands.length > 0) {
      items = items.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.categories.length > 0) {
      items = items.filter((p) => filters.categories.includes(p.category));
    }
    items = items.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      items = items.filter((p) => p.rating >= filters.minRating);
    }

    switch (filters.sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [filters]);

  const toggleCompare = (product: Product) => {
    if (compareList.find((p) => p.id === product.id)) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    } else if (compareList.length < 3) {
      setCompareList((prev) => [...prev, product]);
    }
  };

  return (
    <main className="pb-20 min-h-screen">
      <PageHero
        title="Our Products"
        subtitle={`Showing ${filtered.length} of ${productsData.length} products`}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Products" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            showCapacity={showCapacity}
          />

          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCompare={toggleCompare}
                    isComparing={!!compareList.find((p) => p.id === product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="premium-card p-12 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-heading font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CompareDrawer
        products={compareList}
        onRemove={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClear={() => setCompareList([])}
      />
    </main>
  );
};

export default Products;
