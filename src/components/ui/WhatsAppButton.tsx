import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/918128551508?text=Hello%20EKTA%20FRIDGE!%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        title="Chat on WhatsApp"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
          <div className="relative w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center shadow-lg transition-colors">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-background border border-border text-foreground text-xs px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
