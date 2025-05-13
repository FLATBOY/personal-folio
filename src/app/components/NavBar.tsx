import { useEffect, useState } from "react";
import Image from "next/image";


export default function NavBar({title = "Activities"}: {title?: string}) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const month = now.toLocaleDateString([], {month: 'short'})
      const date = now.toLocaleDateString([], {day: 'numeric'})
      const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' })
      setTime(`${month} ${date} | ${timeStr}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed w-full h-10 flex items-center justify-between px-0 bg-black z-50 top-0 left-0">
      {/* Left: System icon and title */}
      <div className="flex items-center gap-2 pl-4 min-w-48">
        <Image 
          src="/assets/icons/system.png" 
          alt="logo" 
          width={16} 
          height={16} 
          className="w-4 h-4 m-1" />
        <span className="text-white font-bold text-base tracking-wide">Activities</span>
      </div>
      {/* Center: Date & Time */}
      <div className="flex-1 flex justify-center">
        <span className="text-white font-mono text-base">{time}</span>
      </div>
      {/* Right: Power icon */}
      <div className="flex items-center gap-2 pr-4 min-w-24 justify-end">
        <Image 
          src="/assets/icons/power.png" 
          alt="power" 
          width={24} 
          height={24} 
          className="w-6 h-6" />
      </div>
    </div>
  );
} 

