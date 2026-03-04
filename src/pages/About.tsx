import { Users, Target, Eye, Award, ShieldCheck, Star } from "lucide-react";
import StatCounter from "@/components/ui/StatCounter";
import PageHero from "@/components/ui/PageHero";
import heroAbout from "@/assets/hero-about.jpg";

const values = [
  { icon: ShieldCheck, title: "Trust", desc: "Building lasting relationships through transparency and honesty." },
  { icon: Award, title: "Quality", desc: "Only the best products from world-renowned brands." },
  { icon: Target, title: "Innovation", desc: "Embracing technology to serve you better every day." },
  { icon: Users, title: "Customer First", desc: "Your satisfaction is at the heart of everything we do." },
];

const team = [
  { name: "Vikram Mehta", role: "CEO & Founder", initials: "VM", bio: "Electronics industry veteran with 15+ years of experience in consumer appliances." },
  { name: "Neha Kapoor", role: "Head of Sales", initials: "NK", bio: "Leading our sales team to deliver exceptional customer experiences across India." },
  { name: "Arjun Singh", role: "Support Lead", initials: "AS", bio: "Ensuring every customer query is resolved with speed and care." },
];

const stats = [
  { value: "2015", label: "Founded" },
  { value: "50K+", label: "Customers" },
  { value: "200+", label: "Products" },
  { value: "2", label: "Brands" },
];

const About = () => {
  return (
    <main className="pb-0 min-h-screen">
      <PageHero
        title="About ElectraZone"
        subtitle="Your trusted destination for premium electronics since 2015"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
        backgroundImage={heroAbout}
      />

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="section-title mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2015, ElectraZone began as a small electronics shop in the heart of Ahmedabad. With a passion for quality and a commitment to customer satisfaction, we quickly grew into one of Gujarat's most trusted appliance retailers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we proudly serve over 50,000 happy customers with premium products from Samsung and LG. Our mission is simple — to make cutting-edge technology accessible and affordable for every Indian household.
              </p>
            </div>
            <div className="premium-card-elevated p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <p className="font-heading text-2xl font-bold text-primary">Since 2015</p>
                <p className="text-muted-foreground text-sm mt-2">Powering Indian Homes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatCounter stats={stats} />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="premium-card p-8">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To provide every household with access to world-class electronics at honest prices, backed by outstanding after-sales support and genuine manufacturer warranties.
              </p>
            </div>
            <div className="premium-card p-8">
              <Target className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To become India's most loved and trusted electronics destination, where quality meets affordability and every customer feels like family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="premium-card p-6 text-center group hover:border-primary/30">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="premium-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-heading font-bold text-lg">
                  {member.initials}
                </div>
                <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["ISO Certified", "Authorized Samsung Dealer", "Authorized LG Dealer", "5★ Rated"].map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
