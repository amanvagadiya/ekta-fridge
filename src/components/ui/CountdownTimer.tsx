import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 justify-center">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 font-semibold">
              {item.label}
            </span>
          </div>
          {i < 3 && <span className="text-2xl font-bold text-muted-foreground/30 mb-5">:</span>}
        </div>
      ))}
    </div>
  );
};

function getTimeLeft(targetDate: Date) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default CountdownTimer;
