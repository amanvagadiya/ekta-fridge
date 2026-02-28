import { Link } from "react-router-dom";
import HeroSlider from "@/components/ui/HeroSlider";
import BrandCard from "@/components/ui/BrandCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import NewsletterSection from "@/components/ui/NewsletterSection";
import StatCounter from "@/components/ui/StatCounter";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { Truck, Shield, Phone, RotateCcw, Zap } from "lucide-react";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import faqsData from "@/data/faqs.json";
import testimonialsData from "@/data/testimonials.json";

const bestSellers = productsData.filter((p) => p.badge === "Best Seller").slice(0, 4);

// Set deal end date to 15 days from now
const dealEndDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

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
      <HeroSlider />

      {/* Brands */}
      <section id="brands" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              Official Partners
            </span>
            <h2 className="section-title">Our Trusted Brands</h2>
            <p className="section-subtitle">Authorized dealer for world-class electronics</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {brandsData.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary/30">
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
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Thousands Trust ElectraZone</h2>
            <p className="section-subtitle">We go above and beyond for our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="premium-card p-6 text-center group hover:border-primary/30">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Banner with Timer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl p-8 md:p-14 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground mb-3">
                Limited Offer: Up to 40% OFF on ACs!
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">Hurry up — offer ends soon!</p>
              
              <CountdownTimer targetDate={dealEndDate} />
              
              <div className="mt-10">
                <Link to="/products?category=ac" className="btn-primary inline-block !px-10 !py-4 !text-base shadow-lg shadow-primary/20">
                  Shop ACs Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <NewsletterSection />

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
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
