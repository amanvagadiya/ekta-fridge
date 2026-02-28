import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; path?: string }[];
}

const PageHero = ({ title, subtitle, breadcrumbs }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Decorative blurs */}
      <div className="absolute top-0 right-[20%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-[10%] w-48 h-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-primary transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground mt-4 max-w-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
