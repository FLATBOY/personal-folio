// src/app/components/HomeScreen.tsx
"use client";

import { useState } from "react";
import Window from "./Window";
import NavBar from "./NavBar";
import DesktopIcon from "./desktopIcon";
import AboutMe from "./aboutMe";
import Projects from "./Projects";  

interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
}

export default function HomeScreen({setActiveTitle}: {setActiveTitle: (title: string) => void}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [icons, setIcons] = useState([
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
  ]);
  
  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    if (windows.find(w => w.id === id)) return;
    // Clamp window size to fit viewport
    const maxWidth = Math.min(1200, window.innerWidth - 48);
    const maxHeight = Math.min(600, window.innerHeight - 48);
    const width = maxWidth;
    const height = maxHeight;

    // Cascade offset
    const offset = 24 * windows.length;
    let x = (window.innerWidth - width) / 2 + offset;
    let y = (window.innerHeight - height) / 2 + offset;

    // Clamp to keep margin from edge
    x = Math.max(24, Math.min(x, window.innerWidth - width - 24));
    y = Math.max(24, Math.min(y, window.innerHeight - height - 24));

    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 1000;
    setWindows([
      ...windows,
      {
        id,
        title,
        content,
        position: { x, y },
        zIndex: maxZ + 1,
      },
    ]);
    setActiveWindowId(id);
    setActiveTitle(title);
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
    const win = windows.find(w => w.id === id);
    if (win) setActiveTitle(win.title);
  };

  const getContent = (id: string) => {
    if (id === "cv") return <div>CV Content</div>;
    if (id === "projects") return <Projects />;
    if (id === "about") return <AboutMe />;
    return null;
  };

  

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full"
        style={{
          backgroundImage: `url(${'/assets/images/wallpaper.webp'})`,
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
          return (
            <Window
              key={window.id}
              title={window.title}
              defaultPosition={window.position}
              onClose={() => closeWindow(window.id)}
              windowId={window.id}
              width={400}
              height={400}
              zIndex={window.zIndex}
              isActive={activeWindowId === window.id}
              onClick={() => activateWindow(window.id)}
            >
              {window.content}
            </Window>
          );
        })}
      </div>
    </>
  );
}