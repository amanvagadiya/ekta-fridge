import { Link } from "react-router-dom";
import productsData from "@/data/products.json";
import { useStore } from "@/context/StoreContext";
import { Plus, Minus, Trash } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import heroProducts from "@/assets/hero-products.jpg";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useStore();

  const items = cart
    .map((item) => {
      const product = productsData.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...product, qty: item.qty };
    })
    .filter(Boolean) as Array<typeof productsData[0] & { qty: number }>;

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main className="pb-20 min-h-screen">
      <PageHero
        title="Your Cart"
        subtitle={`You have ${items.length} item${items.length !== 1 ? "s" : ""} in cart`}
        breadcrumbs={
          [
            { label: "Home", path: "/" },
            { label: "Cart" },
          ]
        }
        backgroundImage={heroProducts}
      />

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-4xl mb-4">🛒</p>
            <h2 className="section-title mb-4">Your cart is empty</h2>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border border-border rounded-xl">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-semibold text-foreground hover:text-primary">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}

            <div className="text-right font-semibold">
              Total: ₹{total.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
