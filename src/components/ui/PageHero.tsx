import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; path?: string }[];
  backgroundImage?: string;
}

const PageHero = ({ title, subtitle, breadcrumbs, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background Image */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </>
      )}

      {/* Fallback gradient if no image */}
      {!backgroundImage && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-0 right-[20%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-[10%] w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm mb-6">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className={`flex items-center gap-1.5 ${backgroundImage ? 'text-white/70' : 'text-muted-foreground'}`}>
              {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
              {crumb.path ? (
                <Link to={crumb.path} className={`hover:${backgroundImage ? 'text-white' : 'text-primary'} transition-colors`}>{crumb.label}</Link>
              ) : (
                <span className={`font-medium ${backgroundImage ? 'text-white' : 'text-foreground'}`}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight ${backgroundImage ? 'text-white' : 'text-foreground'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-lg mt-4 max-w-lg ${backgroundImage ? 'text-white/80' : 'text-muted-foreground'}`}>{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
