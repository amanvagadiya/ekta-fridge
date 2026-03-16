import { Link } from "react-router-dom";
import HeroSlider from "@/components/ui/HeroSlider";
import BrandCard from "@/components/ui/BrandCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductCard from "@/components/ui/ProductCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StatCounter from "@/components/ui/StatCounter";
import CountdownTimer from "@/components/ui/CountdownTimer";
import PromoSlider from "@/components/ui/PromoSlider";
import Seo from "@/components/seo/Seo";
import { Truck, Shield, Phone, RotateCcw, Zap } from "lucide-react";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import faqsData from "@/data/faqs.json";
import testimonialsData from "@/data/testimonials.json";
import { absoluteUrl, VISIBLE_BRANDS } from "@/lib/seo";

const visibleBrandIds = ["samsung", "lg", "whirlpool", "daikin", "panasonic", "voltas"];
const visibleBrands = brandsData.filter((brand) => visibleBrandIds.includes(brand.id));

const trendingProducts = [...productsData]
  .sort((a, b) => {
    const scoreA = a.rating * 100 + a.reviews;
    const scoreB = b.rating * 100 + b.reviews;
    return scoreB - scoreA;
  })
  .slice(0, 8);

const dealEndDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

const whyUs = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above Rs.10,000" },
  { icon: Shield, title: "2-Year Warranty", desc: "On all products" },
  { icon: Phone, title: "24/7 Support", desc: "Always here to help" },
  { icon: RotateCcw, title: "Easy 7-Day Returns", desc: "Hassle-free returns" },
];

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: `${productsData.length}+`, label: "Products" },
  { value: String(visibleBrands.length), label: "Premium Brands" },
];

const Index = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        name: "EKTA FRIDGE",
        url: absoluteUrl("/"),
        image: absoluteUrl("/image.png"),
        telephone: "+91-81285-51508",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop-No-10, Pirojpura Road, Chhapi Highway, TA-Vadgam",
          addressLocality: "Banaskantha",
          addressRegion: "Gujarat",
          postalCode: "385210",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        name: "EKTA FRIDGE",
        url: absoluteUrl("/"),
      },
    ],
  };

  return (
    <main>
      <Seo
        title="EKTA FRIDGE | Electronics Store In Chhapi"
        description="EKTA FRIDGE is your trusted electronics and home appliances store in Chhapi, Gujarat. Shop AC, fridge, deep freezer, air cooler, washing machine and more."
        path="/"
        image="/image.png"
        keywords={["Ekta Fridge Chhapi", "Ekta", "Ekta Fridge", "Electronics shop in Chhapi", ...VISIBLE_BRANDS]}
        jsonLd={homeSchema}
      />
      <HeroSlider />

      <section id="brands" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              Official Partners
            </span>
            <h2 className="section-title">Our Trusted Brands</h2>
            <p className="section-subtitle">Authorized dealer for world-class electronics</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleBrands.map((brand) => (
              <BrandCard key={brand.id} {...brand} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesData.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Trending Products</h2>
            <p className="section-subtitle">Top performing products with real galleries</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
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

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Thousands Trust EKTA FRIDGE</h2>
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl p-8 md:p-14 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-border relative overflow-hidden mb-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground mb-3">
                Limited Offer: Up to 40% OFF on ACs!
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">Hurry up - offer ends soon!</p>

              <CountdownTimer targetDate={dealEndDate} />

              <div className="mt-10">
                <Link to="/products?category=ac" className="btn-primary inline-block !px-10 !py-4 !text-base shadow-lg shadow-primary/20">
                  Shop ACs Now
                </Link>
              </div>
            </div>
          </div>

          <PromoSlider />
        </div>
      </section>

      <StatCounter stats={stats} />

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

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We have answers.</p>
          </div>
          <FAQAccordion items={faqsData} />
        </div>
      </section>
    </main>
  );
};

export default Index;
