import { Link } from "react-router-dom";
import productsData from "@/data/products.json";
import { useStore } from "@/context/StoreContext";
import { Heart } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import heroProducts from "@/assets/hero-products.jpg";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useStore();

  const items = wishlist
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean) as typeof productsData;

  return (
    <main className="pb-20 min-h-screen">
      <PageHero
        title="Your Wishlist"
        subtitle={`You have ${items.length} item${items.length !== 1 ? "s" : ""} saved`}
        breadcrumbs={
          [
            { label: "Home", path: "/" },
            { label: "Wishlist" },
          ]
        }
        backgroundImage={heroProducts}
      />

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-4xl mb-4">💖</p>
            <h2 className="section-title mb-4">Your wishlist is empty</h2>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="premium-card p-4 relative">
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <Link to={`/product/${item.id}`} className="block">
                  <div className="aspect-square bg-secondary overflow-hidden rounded-lg mb-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-foreground mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="font-bold text-primary">₹{item.price.toLocaleString()}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
