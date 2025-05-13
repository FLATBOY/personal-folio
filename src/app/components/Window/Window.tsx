// src/app/components/Window.tsx
import { Rnd } from "react-rnd";
import React, { ReactNode, useState, useEffect } from "react";
import "../../style.css";
import Image from "next/image";

interface WindowProps {
  title: string;
  children: ReactNode;
  icon?: string;
  onClose?: () => void;
  windowId: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isActive?: boolean;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex?: number;
  onClick?: () => void;
}

const Window = ({
  title,
  children,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  isActive,
  defaultPosition = { x: 100, y: 100 },
  width = 1200,
  height = 400,
  zIndex = 1000,
  onClick,
}: WindowProps) => {
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState(defaultPosition);
  const minWidth = 300;
  const minHeight = 300;
  const navbarHeight = 40; // Height of the navbar in pixels

  // Ensure the window is positioned below the navbar
  useEffect(() => {
    if (position.y < navbarHeight) {
      setPosition(prev => ({ ...prev, y: navbarHeight }));
    }
  }, [position.y]);

  const handleMaximize = () => {
    setMaximized((prev) => !prev);
    if (onMaximize) onMaximize();
  };

  // Get window style based on maximized state
  const getWindowStyle = () => {
    return {
      zIndex: zIndex < 50 ? zIndex : 49, // Ensure window z-index is always below navbar (z-index: 50)
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
      backdropFilter: "blur(5px)",
    };
  };

  return (
    <Rnd
      style={getWindowStyle()}
      size={maximized ? { width: '100vw', height: `calc(100vh - ${navbarHeight}px)` } : { width: size.width, height: size.height }}
      position={maximized ? { x: 0, y: navbarHeight } : position}
      onDragStop={(e, d) => {
        if (!maximized) {
          // Ensure window doesn't go above the navbar
          const newY = Math.max(d.y, navbarHeight);
          setPosition({ x: d.x, y: newY });
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!maximized) {
          setSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          // Ensure window doesn't go above the navbar
          const newY = Math.max(position.y, navbarHeight);
          setPosition({ ...position, y: newY });
        }
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      disableDragging={maximized}
      enableResizing={!maximized}
      dragHandleClassName="modern-window-title-bar"
      className={`modern-window${isActive ? " active" : ""}`}
      onClick={onClick}
      bounds="parent" // Restrict window movement to parent container
    >
      <div className="modern-window-title-bar">
        {/* Left: Window icon */}
        <div className="modern-window-circle">
          {icon ? (
            <Image 
              src={icon} 
              alt={`${title} icon`} 
              width={30} 
              height={30} 
            />
          ) : (
            <div className="window-icon-placeholder"></div>
          )}
        </div>

        {/* Center: Title */}
        <div className="modern-window-title">{title}</div>

        {/* Right: Controls */}
        <div className="modern-window-controls">
          <button onClick={onMinimize} className="modern-window-btn" aria-label="Minimize">
            <Image 
              src="/assets/icons/chevron_down.png" 
              alt="Minimize" 
              width={16} 
              height={16} />
          </button>
          <button onClick={handleMaximize} className="modern-window-btn" aria-label="Maximize">
            <Image 
              src="/assets/icons/chevron_up.png" 
              alt="Maximize" 
              width={16} 
              height={16} />
          </button>
          <button onClick={onClose} className="modern-window-btn" aria-label="Close">
            <Image 
              src="/assets/icons/close.png" 
              alt="Close" 
              width={16} 
              height={16} />
          </button>
        </div>
      </div>
      <div className="modern-window-content">
        {children}
      </div>
    </Rnd>
  );
};

export default Window;
