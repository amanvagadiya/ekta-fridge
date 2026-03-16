import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Truck, ShieldCheck, RotateCcw, Phone, ChevronRight, Minus, Plus, ChevronLeft } from "lucide-react";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/context/StoreContext";

const brandLogos: Record<string, string> = {
  samsung: "/uploads/samsung-logo.png",
  lg: "/uploads/lg-logo.png",
  whirlpool: "/uploads/whirlpool-logo.svg",
  daikin: "/uploads/daikin-logo.png",
  panasonic: "/uploads/panasonic-logo.svg",
  voltas: "/uploads/voltas-logo.png",
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const { addToCart } = useStore();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  const brandMeta = useMemo(() => brandsData.find((b) => b.id === product?.brand), [product?.brand]);

  if (!product) {
    return (
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <p className="text-6xl mb-4">Product missing</p>
          <h2 className="section-title">Product Not Found</h2>
          <Link to="/products" className="btn-primary inline-block mt-6">Back to Products</Link>
        </div>
      </main>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const relatedProducts = productsData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.gallery?.length ? [...new Set(product.gallery)] : [product.image];
  const brandLogo = brandLogos[product.brand];

  useEffect(() => {
    setSelectedImage(0);
  }, [product.id]);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl bg-secondary border border-border overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-all duration-300"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-2 hover:bg-background"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 rounded-full p-2 hover:bg-background"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground" />
                  </button>
                </>
              )}

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-sm">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
                  -{discount}% OFF
                </span>
              )}
            </div>

            <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className={`h-24 w-24 min-w-24 rounded-xl overflow-hidden border-2 transition-all bg-secondary ${
                    selectedImage === i ? "border-primary shadow-md" : "border-border hover:border-primary/30"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain p-1" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              {brandLogo ? (
                <img src={brandLogo} alt={brandMeta?.name || product.brand} className="h-8 w-auto object-contain" />
              ) : (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase text-white"
                  style={{ backgroundColor: brandMeta?.color || "#334155" }}
                >
                  {brandMeta?.name || product.brand}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{product.rating} Star Rating</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <div>
                <span className="text-muted-foreground">Category: </span>
                <span className="font-semibold text-foreground capitalize">{product.category.replace("-", " ")}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Availability: </span>
                <span className={`font-semibold ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-heading font-extrabold text-primary">
                Rs.{product.price.toLocaleString()}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                Rs.{product.originalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">Specifications</p>
              <div className="flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span key={spec} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary border border-border text-foreground">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold text-foreground border-x border-border">
                  {String(qty).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product.id, qty);
                  toast({ title: "Added to cart", description: product.name });
                }}
                className="btn-outline flex items-center gap-2 flex-1"
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={() => {
                const msg = `Hello EKTA FRIDGE!\n\nI'd like to buy:\n- ${product.name}\n- Brand: ${brandMeta?.name || product.brand}\n- Category: ${product.category.replace("-", " ")}\n- Quantity: ${qty}\n- Price: Rs.${product.price.toLocaleString()} (${discount}% off)\n\nProduct link: ${window.location.href}`;
                const url = `https://wa.me/918128551508?text=${encodeURIComponent(msg)}`;
                window.open(url, "_blank");
              }}
              className="btn-primary w-full !py-4 !text-base mb-8"
            >
              Buy Now
            </button>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Truck, text: "Free Shipping on orders above Rs.10,000" },
                { icon: ShieldCheck, text: "2 Year Manufacturer Warranty" },
                { icon: RotateCcw, text: "Easy 7-Day Return Policy" },
                { icon: Phone, text: "24/7 Customer Support" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/50 border border-border">
                  <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="border-b border-border mb-8">
          <div className="flex gap-0">
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "reviews" ? `Reviews (${product.reviews})` : tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "description" ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The {product.name} is a premium {product.category.replace("-", " ")} from {brandMeta?.name || product.brand}. 
                Built with modern technology and designed for daily efficiency, this product delivers
                dependable performance for your home. With features like {product.specs.join(", ")}, it sets a high
                standard in its category.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-3">
                {[
                  "2 Year Manufacturer Warranty",
                  "Free Shipping and Fast Delivery",
                  "100% Money-back Guarantee",
                  "24/7 Customer Support",
                  "Secure Payment Methods",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Shipping Information</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">Standard:</span> 3-5 business days, Free</li>
                <li><span className="font-medium text-foreground">Express:</span> 1-2 business days, Rs.299</li>
                <li><span className="font-medium text-foreground">Installation:</span> Free professional setup</li>
                <li><span className="font-medium text-foreground">Returns:</span> 7-day easy return policy</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-sm">
              This product has {product.reviews} reviews with an average rating of {product.rating} out of 5 stars.
              Customer reviews will be displayed here.
            </p>
          </div>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="section-title mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="premium-card overflow-hidden group hover:-translate-y-1">
                <div className="aspect-square bg-secondary overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-sm text-foreground line-clamp-2 mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-bold text-primary">Rs.{p.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground line-through">Rs.{p.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
