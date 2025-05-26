// src/app/components/HomeScreen.tsx
"use client";

import { useState, useEffect } from "react";
import Window from "./Window/Window";
import DesktopIcon from "./desktopIcon";
import AboutMe from "./Pages/About/aboutMe";
import Projects from "./Pages/Projects";  

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  icon?: string;
}

export default function HomeScreen() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const icons = [
    {
      id: 'cv',
      icon: '/assets/icons/cv.png',
      label: 'CV-Resume',
      position: { x: 40, y: 40 }
    },
    {
      id: 'projects',
      icon: '/assets/icons/projects.png',
      label: 'Projects',
      position: { x: 40, y: 120 }
    },
    {
      id: 'about',
      icon: '/assets/icons/about.png',
      label: 'About Me',
      position: { x: 40, y: 200 }
    }
  ];
  
  // Disable scrolling when component mounts
  useEffect(() => {
    // Save original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Disable scroll
    document.body.style.overflow = 'hidden';
    
    // Restore original styles when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    if (windows.find(w => w.id === id)) return;
    
    // Set window size based on content type
    let width, height;
    
    if (id === "about") {
      width = 800;
      height = 600;
    } else if (id === "cv") {
      // PDF dimensions (A4 aspect ratio with reasonable size)
      width = 595;  // A4 width in points
      height = 842; // A4 height in points
    } else {
      // Default size for other windows
      width = Math.min(1200, window.innerWidth - 48);
      height = Math.min(600, window.innerHeight - 48);
    }

    // Smart cascade positioning
    const baseX = (window.innerWidth - width) / 2;
    const baseY = (window.innerHeight - height) / 2;
    
    // Limit maximum cascade to prevent going off-screen
    // We'll use modulo to reset positions after a certain number of windows
    const maxCascadeSteps = 5;
    const offsetStep = 30;
    const cascadeIndex = windows.length % maxCascadeSteps;
    const offsetX = cascadeIndex * offsetStep;
    const offsetY = cascadeIndex * offsetStep;
    
    // Calculate position with limited cascade offset
    let x = baseX + offsetX;
    let y = baseY + offsetY;
    
    // Ensure window is always within visible bounds
    x = Math.max(24, Math.min(x, window.innerWidth - width - 24));
    y = Math.max(24, Math.min(y, window.innerHeight - height - 24));

    const iconObj = icons.find(i => i.id === id);
    const iconPath = iconObj ? iconObj.icon : undefined;
    
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 1000;
    setWindows([
      ...windows,
      {
        id,
        title,
        content,
        position: { x, y },
        zIndex: maxZ + 1,
        icon: iconPath,
      },
    ]);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const activateWindow = (id: string) => {
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 1000;
    setWindows(windows =>
      windows.map(w =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      )
    );
    setActiveWindowId(id);
  };

  const getContent = (id: string) => {
    if (id === "cv") return (
      <iframe 
        src="/assets/Images/CV-RESUME.pdf" 
        width="100%" 
        height="100%" 
        style={{ border: 'none' }}
        title="CV Resume"
      />
    );
    if (id === "projects") return <Projects />;
    if (id === "about") return <AboutMe />;
    return null;
  };

  

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full pt-10"
        style={{
          backgroundImage: `url(${'/assets/Images/my_desktop.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-row items-center justify-center gap-12 w-full ">
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              iconId={icon.id}
              icon={icon.icon}
              label={icon.label}
              onDoubleClick={() => openWindow(icon.id, icon.label, getContent(icon.id))}
              selected={selectedIcon === icon.id}
              onClick={() => setSelectedIcon(icon.id)}
            />
          ))}
        </div>
        {/* Windows */}
        {windows.map((window) => {
          // Find the matching icon for this window
          const windowIcon = icons.find(i => i.id === window.id)?.icon;
          
          // Determine window dimensions based on window type
          let windowWidth = 400;
          let windowHeight = 400;
          
          if (window.id === "about") {
            windowWidth = 800;
            windowHeight = 600;
          } else if (window.id === "cv") {
            // PDF dimensions (A4 aspect ratio with reasonable size)
            windowWidth = 595;  // A4 width in points
            windowHeight = 842; // A4 height in points
          }
          
          return (
            <Window
              key={window.id}
              title={window.title}
              defaultPosition={window.position}
              onClose={() => closeWindow(window.id)}
              windowId={window.id}
              width={windowWidth}
              height={windowHeight}
              zIndex={window.zIndex}
              isActive={activeWindowId === window.id}
              onClick={() => activateWindow(window.id)}
              icon={windowIcon}
            >
              {window.content}
            </Window>
          );
        })}
      </div>
    </>
  );
}