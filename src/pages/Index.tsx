import { Link } from "react-router-dom";
import HeroSlider from "@/components/ui/HeroSlider";
import BrandCard from "@/components/ui/BrandCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import NewsletterSection from "@/components/ui/NewsletterSection";
import StatCounter from "@/components/ui/StatCounter";
import { Truck, Shield, Phone, RotateCcw, Zap } from "lucide-react";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import faqsData from "@/data/faqs.json";
import testimonialsData from "@/data/testimonials.json";

const bestSellers = productsData.filter((p) => p.badge === "Best Seller").slice(0, 4);

const whyUs = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹10,000" },
  { icon: Shield, title: "2-Year Warranty", desc: "On all products" },
  { icon: Phone, title: "24/7 Support", desc: "Always here to help" },
  { icon: RotateCcw, title: "Easy 7-Day Returns", desc: "Hassle-free returns" },
];

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Products" },
  { value: "2", label: "Premium Brands" },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <HeroSlider />

      {/* Brands */}
      <section id="brands" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Trusted Brands</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-3" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {brandsData.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesData.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">🔥 Best Sellers This Month</h2>
            <p className="section-subtitle">Top picks loved by our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Thousands Trust ElectraZone</h2>
            <p className="section-subtitle">We go above and beyond for our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="glass-card p-6 text-center group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(192 100% 50% / 0.15), hsl(210 100% 50% / 0.1))" }}>
            <div className="absolute inset-0 star-field opacity-50" />
            <div className="relative z-10">
              <Zap className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Limited Offer: Up to 40% OFF on ACs this Summer!
              </h2>
              <p className="text-muted-foreground mb-6">Don't miss out — offer ends soon!</p>
              <Link to="/products?category=ac" className="btn-primary inline-block">
                Shop ACs Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatCounter stats={stats} />

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonialsData.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We've got answers.</p>
          </div>
          <FAQAccordion items={faqsData} />
        </div>
      </section>
    </main>
  );
};

export default Index;
