import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20ElectraZone!%20I%20need%20help."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      title="Chat with us!"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring" />
        <div className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg transition-colors">
          <MessageCircle className="w-6 h-6 text-background" />
        </div>
      </div>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-background border border-white/10 text-foreground text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
};

export default WhatsAppButton;
