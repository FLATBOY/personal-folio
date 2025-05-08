"use client";

import { useState } from "react";
import Window from "./Window";

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
}

export default function HomeScreen() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  
  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    // Check if window already exists
    if (windows.find(w => w.id === id)) return;
    
    // Calculate position to stack windows
    const offset = windows.length * 30;
    setWindows([...windows, {
      id,
      title,
      content,
      position: { x: offset, y: offset }
    }]);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full"
    style={{
      backgroundImage: `url(${'/assets/images/wallpaper.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
        <div className="absolute top-4 left-4 flex gap-8">
            <div className="flex flex-col items-center cursor-pointer select-none" 
                 onClick={() => openWindow('cv', 'CV-Resume', <div>CV Content</div>)}>
                <span className="text-3xl">📄</span>
                <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">CV-Resume</span>
            </div>
            
            <div className="flex flex-col items-center cursor-pointer select-none" 
                 onClick={() => openWindow('projects', 'Projects', <div>Projects Content</div>)}>
                <span className="text-3xl">💻</span>
                <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">Projects</span>
            </div>
            
            <div className="flex flex-col items-center cursor-pointer select-none" 
                 onClick={() => openWindow('about', 'About Me', <div>About Me Content</div>)}>
                <span className="text-3xl">👤</span>
                <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">About Me</span>
            </div>
        </div>

        {windows.map((window) => (
          <Window
            key={window.id}
            title={window.title}
            defaultPosition={window.position}
            onClose={() => closeWindow(window.id)}
          >
            {window.content}
          </Window>
        ))}
    </div>
  );
} 