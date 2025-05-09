// src/app/components/HomeScreen.tsx
"use client";

import { useRef, useState } from "react";
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
}

export default function HomeScreen() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [icons, setIcons] = useState([
    {
      id: 'cv',
      icon: '/assets/icons/file_doc.png',
      label: 'CV-Resume',
      position: { x: 40, y: 40 }
    },
    {
      id: 'projects',
      icon: '/assets/icons/folder_programs.png',
      label: 'Projects',
      position: { x: 40, y: 120 }
    },
    {
      id: 'about',
      icon: '/assets/icons/people.png',
      label: 'About Me',
      position: { x: 40, y: 200 }
    }
  ]);
  
  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    if (windows.find(w => w.id === id)) return;
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

  const getContent = (id: string) => {
    if (id === "cv") return <div>CV Content</div>;
    if (id === "projects") return <Projects />;
    if (id === "about") return <AboutMe />;
    return null;
  };

  return (
    <>
      <div className="relative min-h-screen w-full"
        style={{
          backgroundImage: `url(${'/assets/images/wallpaper.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={icon.position}
            onDoubleClick={() => openWindow(icon.id, icon.label, getContent(icon.id))}
            selected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
            onDrag={(newPos) => {
              setIcons((prev) =>
                prev.map((i) =>
                  i.id === icon.id ? { ...i, position: newPos } : i
                )
              );
            }}
          />
        ))}
        
        {windows.map((window) => {
          return (
            <Window
              key={window.id}
              title={window.title}
              defaultPosition={window.position}
              onClose={() => closeWindow(window.id)}
              windowId={window.id}
            >
              {window.content}
            </Window>
          );
        })}
        <NavBar />
      </div>
    </>
  );
}