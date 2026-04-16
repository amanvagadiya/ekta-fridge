import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, Truck, ShieldCheck, RotateCcw, Phone,
  ChevronRight, ChevronLeft, Minus, Plus, MessageCircle,
  Tag, CheckCircle2
} from "lucide-react";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import Seo from "@/components/seo/Seo";
import { absoluteUrl } from "@/lib/seo";
import { productPathFromProduct, resolveProductFromSlug } from "@/lib/productUrl";

const brandLogos: Record<string, string> = {
  samsung: "/uploads/samsung-logo.png",
  lg: "/uploads/lg-logo.png",
  whirlpool: "/uploads/whirlpool-logo.svg",
  daikin: "/uploads/daikin-logo.png",
  panasonic: "/uploads/panasonic-logo.svg",
  voltas: "/uploads/voltas-logo.png",
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = resolveProductFromSlug(slug);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const brandMeta = useMemo(() => brandsData.find((b) => b.id === product?.brand), [product?.brand]);

  if (!product) {
    return (
      <main className="pt-32 pb-20 min-h-screen">
        <Seo title="Product Not Found | EKTA FRIDGE" description="Product not found." path="/products" noindex />
        <div className="container mx-auto px-4 text-center">
          <p className="text-5xl mb-4">🔍</p>
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
  const productPath = productPathFromProduct(product);

  useEffect(() => { setSelectedImage(0); }, [product.id]);

  // scroll active thumb into view
  useEffect(() => {
    if (!thumbsRef.current) return;
    const active = thumbsRef.current.children[selectedImage] as HTMLElement;
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedImage]);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.map((img) => absoluteUrl(img)),
    sku: product.modelCode || product.id,
    brand: { "@type": "Brand", name: brandMeta?.name || product.brand },
    category: product.category,
    description: `${product.name} from EKTA FRIDGE. Specs: ${product.specs.join(", ")}.`,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(productPath),
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
  };

  const trustBadges = [
    { icon: Truck,        label: "2 Year Compressor",  sub: "Compressor coverage included" },
    { icon: ShieldCheck,  label: "1 Year Warranty", sub: "Manufacturer backed" },
    { icon: RotateCcw,    label: "7-Day Returns",  sub: "Hassle-free policy" },
    { icon: Phone,        label: "24/7 Support",   sub: "Always here for you" },
  ];

  return (
    <>
      <style>{`
        /* ── animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu { animation: fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .d1{animation-delay:.05s} .d2{animation-delay:.10s} .d3{animation-delay:.15s}
        .d4{animation-delay:.20s} .d5{animation-delay:.26s} .d6{animation-delay:.32s}

        /* ── gallery ── */
        .gallery-wrap {
          /* never overflow the column */
          width: 100%;
          min-width: 0;
        }
        .main-img-box {
          position: relative;
          width: 100%;
          /* 1:1 square on all screens */
          padding-bottom: 100%;
          border-radius: 1rem;
          overflow: hidden;
          background: transparent;
          border: 1px solid var(--color-border, #e2e8f0);
        }
        .main-img-box img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1.5rem;
          transition: opacity .3s;
        }
        /* ── thumbs strip ── */
        .thumbs-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          /* show ~4.5 thumbs regardless of screen width */
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }
        .thumbs-strip::-webkit-scrollbar { height: 4px; }
        .thumbs-strip::-webkit-scrollbar-track { background: transparent; }
        .thumbs-strip::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 4px; }
        .thumb-item {
          scroll-snap-align: start;
          flex: 0 0 calc((100% - 32px) / 4.5); /* 4.5 visible */
          aspect-ratio: 1 / 1;
          border-radius: .6rem;
          overflow: hidden;
          border: 2px solid var(--color-border, #e2e8f0);
          background: transparent;
          cursor: pointer;
          transition: border-color .18s, box-shadow .18s;
        }
        .thumb-item:hover  { border-color: var(--color-primary, #3b82f6); }
        .thumb-item.active { border-color: var(--color-primary, #3b82f6); box-shadow: 0 0 0 2px rgba(59,130,246,.25); }
        .thumb-item img { width:100%; height:100%; object-fit:contain; padding:.35rem; }

        /* ── desktop: side-by-side thumbs layout ── */
        @media (min-width: 1024px) {
          .gallery-inner {
            display: flex;
            flex-direction: row;
            gap: 10px;
            align-items: flex-start;
          }
          /* vertical thumbs column on the left */
          .thumbs-strip-desktop {
            display: flex;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
            max-height: 480px;
            width: 72px;
            flex-shrink: 0;
            padding-right: 2px;
          }
          .thumbs-strip-desktop::-webkit-scrollbar { width: 4px; }
          .thumbs-strip-desktop::-webkit-scrollbar-track { background: transparent; }
          .thumbs-strip-desktop::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 4px; }
          .thumb-item-desktop {
            width: 100%;
            aspect-ratio: 1 / 1;
            flex-shrink: 0;
            border-radius: .6rem;
            overflow: hidden;
            border: 2px solid var(--color-border, #e2e8f0);
            background: transparent;
            cursor: pointer;
            transition: border-color .18s, box-shadow .18s;
          }
          .thumb-item-desktop:hover  { border-color: var(--color-primary, #3b82f6); }
          .thumb-item-desktop.active { border-color: var(--color-primary, #3b82f6); box-shadow: 0 0 0 2px rgba(59,130,246,.25); }
          .thumb-item-desktop img { width:100%; height:100%; object-fit:contain; padding:.35rem; }
          /* big image takes remaining space */
          .main-img-area { flex: 1; min-width: 0; }
          /* hide mobile thumbs strip on desktop */
          .thumbs-mobile { display: none !important; }
          /* hide desktop strip on mobile */
          .thumbs-desktop { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .gallery-inner { display: block; }
          .thumbs-desktop { display: none !important; }
          .thumbs-mobile  { display: flex !important; }
        }

        /* ── misc ── */
        .spec-pill {
          background: rgba(59,130,246,.07);
          border: 1px solid rgba(59,130,246,.18);
        }
        .buy-btn {
          background: linear-gradient(135deg,#16a34a,#15803d);
          box-shadow: 0 4px 18px rgba(22,163,74,.35);
          transition: box-shadow .2s, transform .15s;
        }
        .buy-btn:hover  { box-shadow: 0 6px 28px rgba(22,163,74,.5); transform: translateY(-1px); }
        .buy-btn:active { transform: translateY(0); }
        .related-card { transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s; }
        .related-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.12); }
      `}</style>

      <main className="pt-20 md:pt-24 pb-20 min-h-screen bg-background">
        <Seo
          title={`${product.name} | EKTA FRIDGE`}
          description={`${product.name} at EKTA FRIDGE. Price: Rs.${product.price.toLocaleString()}.`}
          path={productPath}
          image={images[0]}
          type="product"
          keywords={["Ekta Fridge", product.name, product.modelCode, brandMeta?.name || product.brand, product.category]}
          jsonLd={productSchema}
        />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-4 pb-2">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>

        {/* ── PRODUCT SECTION ── */}
        <section className="container mx-auto px-4 py-6 lg:py-10 overflow-x-hidden">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 items-start">

            {/* ── GALLERY ── */}
            <div className="gallery-wrap fu d1">
              <div className="gallery-inner">

                {/* Desktop: vertical thumbs on left */}
                <div className="thumbs-desktop thumbs-strip-desktop" ref={thumbsRef}>
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setSelectedImage(i)}
                      className={`thumb-item-desktop ${selectedImage === i ? "active" : ""}`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="main-img-area">
                  <div className="main-img-box">
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      loading="eager"
                      fetchPriority="high"
                    />

                    {/* Prev/Next arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage((i) => (i - 1 + images.length) % images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center shadow hover:bg-background transition-colors z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4 text-foreground" />
                        </button>
                        <button
                          onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center shadow hover:bg-background transition-colors z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4 text-foreground" />
                        </button>
                      </>
                    )}

                    {/* Badges */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground shadow z-10">
                        {product.badge}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full bg-red-500 text-white shadow z-10">
                        -{discount}%
                      </span>
                    )}

                    {/* Dot indicators (mobile, ≤4 images) */}
                    {images.length > 1 && images.length <= 6 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            className={`rounded-full transition-all ${selectedImage === i ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-foreground/30"}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile: horizontal thumbs strip below image */}
                  {images.length > 1 && (
                    <div className="thumbs-mobile thumbs-strip mt-3 scrollbar-hide" ref={thumbsRef}>
                      {images.map((img, i) => (
                        <button
                          key={img + i}
                          onClick={() => setSelectedImage(i)}
                          className={`thumb-item ${selectedImage === i ? "active" : ""}`}
                          aria-label={`View image ${i + 1}`}
                        >
                          <img src={img} alt={`${product.name} ${i + 1}`} loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── PRODUCT INFO ── */}
            <div className="space-y-5 min-w-0">

              {/* Brand + stock */}
              <div className="fu d2 flex items-center justify-between gap-3 flex-wrap">
                {brandLogo ? (
                  <img src={brandLogo} alt={brandMeta?.name || product.brand} className="h-7 w-auto max-w-[120px] object-contain" />
                ) : (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase text-white"
                    style={{ backgroundColor: brandMeta?.color || "#334155" }}
                  >
                    {brandMeta?.name || product.brand}
                  </span>
                )}
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                  product.inStock ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Title */}
              <div className="fu d2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                {product.modelCode && (
                  <p className="text-xs text-muted-foreground mt-1">Model: <span className="font-mono font-medium text-foreground">{product.modelCode}</span></p>
                )}
              </div>

              {/* Rating */}
              <div className="fu d3 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews} verified)</span>
              </div>

              <div className="fu d3 border-t border-border/60" />

              {/* Price */}
              <div className="fu d3">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight">
                    Rs.{product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground line-through">Rs.{product.originalPrice.toLocaleString()}</span>
                    {discount > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700">
                        <Tag className="w-3 h-3" />{discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes · EMI available</p>
              </div>

              {/* Specs */}
              <div className="fu d4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Specifications</p>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span key={spec} className="spec-pill px-3 py-1.5 rounded-lg text-xs font-medium text-foreground">{spec}</span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="fu d4 flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Category:</span>
                <Link to="/products" className="font-semibold text-primary capitalize hover:underline">
                  {product.category.replace("-", " ")}
                </Link>
              </div>

              <div className="fu d5 border-t border-border/60" />

              {/* Qty + Buy */}
              <div className="fu d5 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-border overflow-hidden bg-secondary/40">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-11 flex items-center justify-center text-sm font-bold text-foreground border-x border-border">
                    {String(qty).padStart(2, "0")}
                  </span>
                  <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    const msg = `Hello EKTA FRIDGE!\n\nI'd like to buy:\n- ${product.name}\n- Brand: ${brandMeta?.name || product.brand}\n- Qty: ${qty}\n- Price: Rs.${product.price.toLocaleString()} (${discount}% off)\n\nLink: ${window.location.href}`;
                    window.open(`https://wa.me/918128551508?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="buy-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm flex-1 sm:flex-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  Buy via WhatsApp
                </button>
              </div>

              {/* Trust badges */}
              <div className="fu d6 grid grid-cols-2 gap-2">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/50 border border-border/70">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight">{b.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight truncate">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DESCRIPTION ── */}
        <section className="container mx-auto px-4 py-10 border-t border-border/50">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 xl:gap-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">About this Product</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The <span className="text-foreground font-medium">{product.name}</span> is a premium{" "}
                {product.category.replace("-", " ")} from {brandMeta?.name || product.brand}. Engineered for
                daily reliability with {product.specs.slice(0, 3).join(", ")}, it sets a high standard in its class.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {["1 Year Manufacturer Warranty","2 Year Compressor","100% Authentic Product","Professional Installation","Secure Payment Methods"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Delivery & Returns</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Standard",     value: "3–5 business days · Free" },
                  { label: "Express",      value: "1–2 business days · Rs.299" },
                  { label: "Installation", value: "Free professional setup" },
                  { label: "Returns",      value: "7-day easy return policy" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-2 pb-2.5 border-b border-border/50 last:border-0 last:pb-0 text-sm">
                    <span className="font-semibold text-foreground">{row.label}</span>
                    <span className="text-muted-foreground text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-10 border-t border-border/50">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-heading font-bold text-foreground">Related Products</h2>
              <Link to="/products" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {relatedProducts.map((p) => {
                const rd = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                return (
                  <Link key={p.id} to={productPathFromProduct(p)} className="related-card block rounded-2xl border border-border overflow-hidden bg-card">
                    <div className="relative aspect-square bg-transparent overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {rd > 0 && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white">{-rd}%</span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-xs md:text-sm text-foreground line-clamp-2 mb-1.5 leading-snug">{p.name}</h3>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-primary">Rs.{p.price.toLocaleString()}</span>
                        <span className="text-[10px] text-muted-foreground line-through">Rs.{p.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductDetail;
