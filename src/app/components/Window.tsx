// src/app/components/Window.tsx
import Draggable from "react-draggable";
import React, { ReactNode, useRef, useState } from "react";
import "../style.css";
import Image from "next/image";

interface WindowProps {
  title: string;
  children: ReactNode;
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
  onClose,
  onMinimize,
  onMaximize,
  isActive,
  defaultPosition,
  width = 1200,
  height = 400,
  zIndex = 1000,
  onClick,
}: WindowProps) => {
  const nodeRef = useRef<HTMLDivElement>(null!);
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState({ width, height });
  const minWidth = 600;
  const minHeight = 300;
  const resizingRef = useRef<{ dir: string | null; startX: number; startY: number; startW: number; startH: number } | null>(null);

  const handleMaximize = () => {
    setMaximized((prev) => !prev);
    if (onMaximize) onMaximize();
  };

  const handleResizeMouseDown = (dir: string, e: React.MouseEvent) => {
    e.stopPropagation();
    resizingRef.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizing = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { dir, startX, startY, startW, startH } = resizingRef.current;
    if (!dir) return;
    let newWidth = startW;
    let newHeight = startH;
    if (dir.includes("right")) {
      newWidth = Math.max(minWidth, startW + (e.clientX - startX));
    }
    if (dir.includes("left")) {
      newWidth = Math.max(minWidth, startW - (e.clientX - startX));
    }
    if (dir.includes("bottom")) {
      newHeight = Math.max(minHeight, startH + (e.clientY - startY));
    }
    if (dir.includes("top")) {
      newHeight = Math.max(minHeight, startH - (e.clientY - startY));
    }
    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeMouseUp = () => {
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", handleResizeMouseUp);
    resizingRef.current = null;
  };

  // Centered style if not maximized
  const getWindowStyle = () => {
    if (maximized) {
      return {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '50vw',
        height: '20vh',
        zIndex,
      } as React.CSSProperties;
    }
    return {
      width: size.width,
      height: size.height,
      zIndex,
    } as React.CSSProperties;
  };

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition} disabled={maximized} >
      <div 
        ref={nodeRef} 
        className={`modern-window${isActive ? " active" : ""}`} 
        style={getWindowStyle()}
        onClick={onClick}
      >
        <div className="modern-window-title-bar">
          {/* Left: White circle */}
          <div className="modern-window-circle"></div>
          {/* Center: Title */}
          <div className="modern-window-title">{title}</div>
          {/* Right: Controls */}
          <div className="modern-window-controls">
            <button onClick={onMinimize} className="modern-window-btn" aria-label="Minimize">
              <Image src="/icons/chevron-down.png" alt="Minimize" width={16} height={16} />
            </button>
            <button onClick={handleMaximize} className="modern-window-btn" aria-label="Maximize">
              <Image src="/icons/chevron-up.png" alt="Maximize" width={16} height={16} />
            </button>
            <button onClick={onClose} className="modern-window-btn" aria-label="Close">
              <Image src="/icons/close.png" alt="Close" width={16} height={16} />
            </button>
          </div>
        </div>
        <div className="modern-window-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
