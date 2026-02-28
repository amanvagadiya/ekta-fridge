import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BrandCardProps {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  color: string;
}

const SamsungLogo = () => (
  <svg viewBox="0 0 2500 500" className="h-10 w-auto" fill="hsl(var(--foreground))">
    <path d="M308.7 167.4c-39.6-17.2-52.8-28.2-52.8-44.6 0-13.4 12.2-27.8 42.6-27.8 30.2 0 52 10.4 52 10.4l16.6-52.6s-23.2-12.8-67.2-12.8c-69.8 0-118.2 40.2-118.2 96.2 0 40.4 29.2 69.6 67 86.4 30.4 13.4 41 24 41 42.8 0 17.8-14.4 31.4-41.2 31.4-39.4 0-66.8-20.4-66.8-20.4L163.7 329s30.8 23.4 81.2 23.4c72.2 0 118-35.4 118-98.8 0-43.4-29.8-71-54.2-86.2zm236 5.4h-93.2L516.9 345h69.8l-12-35.8h85.2L672.5 345h73L680.7 172.8zm-36.6 95.4l22-65.6 22 65.6h-44zm365-95.4h-56.8l0 106.4-87.8-106.4h-63.2V345h56.6V237l89.2 108h61.8V172.8h.2zm267.4 0h-56.6l0 106.4-87.8-106.4h-63.2V345h56.6V237l89.2 108h61.8V172.8zm-470.8 0l-56.6.2s0 80.4 0 112.8c0 40.2-36 44-50.8 44-17.4 0-50.2-6.2-50.2-43.8V172.8h-57v114.4c0 44.4 28.4 65.2 57.2 65.2h.2c34.4 0 53.4-10.4 68.2-32.2l-4.2 29h93.2V172.8zm596-1.4c-39.6-17.2-52.8-28.2-52.8-44.6 0-13.4 12.2-27.8 42.6-27.8 30.2 0 52 10.4 52 10.4l16.6-52.6s-23.2-12.8-67.2-12.8c-69.8 0-118.2 40.2-118.2 96.2 0 40.4 29.2 69.6 67 86.4 30.4 13.4 41 24 41 42.8 0 17.8-14.4 31.4-41.2 31.4-39.4 0-66.8-20.4-66.8-20.4L1647 329s30.8 23.4 81.2 23.4c72.2 0 118-35.4 118-98.8 0-43.4-29.8-71-54.2-86.2zm163.2 7h93.4l-65.4 172.2h69.8l12-35.8h85.2l12.6 35.8h73l-64.8-172.2h-93.4V173l-57.4.2v.2h-.2l-56.6.2s0 80.4 0 112.8c0 40.2 0 59.4 0 59.4"/>
  </svg>
);

const LGLogo = () => (
  <svg viewBox="0 0 300 120" className="h-12 w-auto" fill="hsl(var(--foreground))">
    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="80" fontWeight="800" fontFamily="Arial, sans-serif">LG</text>
  </svg>
);

const BrandCard = ({ id, name, tagline, productCount }: BrandCardProps) => {
  const navigate = useNavigate();
  const isSamsung = id === "samsung";

  return (
    <div
      className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
      onClick={() => navigate(`/products?brand=${id}`)}
    >
      {/* Accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isSamsung ? 'bg-blue-500' : 'bg-red-500'} transition-all duration-300 group-hover:h-1.5`} />
      
      <div className="p-8 pt-10">
        {/* Logo */}
        <div className="mb-6 h-14 flex items-center">
          {isSamsung ? (
            <div className="text-3xl font-heading font-extrabold tracking-wider text-foreground">SAMSUNG</div>
          ) : (
            <div className="text-4xl font-heading font-extrabold text-foreground">LG</div>
          )}
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground mb-6 leading-relaxed">{tagline}</p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary text-muted-foreground border border-border">
            {productCount} Products
          </span>
          <button className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
