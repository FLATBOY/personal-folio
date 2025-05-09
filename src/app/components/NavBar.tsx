import { useEffect, useState } from "react";

export default function NavBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-auto flex items-center justify-between px-2"
      style={{
        backgroundImage: `url(${'/assets/images/Task-Bar.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 50,
      }}
    >
      {/* Left side (empty for now, reserved for Start button or other items) */}
      <div className="flex-1" />
      {/* Clock on the right */}
      <div
        className="flex items-center gap-2 px-4 py-1 rounded text-white font-mono text-base shadow-inner"
      >
        <img src="/assets/icons/windows_logo.png" alt="icon" className="w-4 h-4" />
        <span>{time}</span>
      </div>
    </div>
  );
} 