import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  city: string;
  rating: number;
  text: string;
  initials: string;
}

const TestimonialCard = ({ name, city, rating, text, initials }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-6 relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-heading font-bold text-sm">
          {initials}
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm text-foreground">{name}</h4>
          <p className="text-xs text-muted-foreground">{city}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? "text-accent fill-accent" : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
};

export default TestimonialCard;
