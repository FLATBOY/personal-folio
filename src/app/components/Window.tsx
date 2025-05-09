// src/app/components/Window.tsx
import Draggable from "react-draggable";
import React, { ReactNode, forwardRef } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  windowId: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isActive?: boolean;
  defaultPosition?: { x: number; y: number };
}

const Window = forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      title,
      children,
      onClose,
      onMinimize,
      onMaximize,
      isActive,
      defaultPosition,
    },
    ref
  ) => (
    // <Draggable nodeRef={ref as React.RefObject<HTMLDivElement>} defaultPosition={defaultPosition}>
      <Draggable defaultPosition={defaultPosition}>
      <div className={`window-xp ${isActive ? "active" : ""}`}>
        <div className="window-xp-title-bar">
          <span className="window-xp-title">{title}</span>
          <div className="window-xp-controls">
            {onMinimize && (
              <button onClick={onMinimize} className="window-xp-btn">_</button>
            )}
            {onMaximize && (
              <button onClick={onMaximize} className="window-xp-btn">[ ]</button>
            )}
            {onClose && (
              <button onClick={onClose} className="window-xp-btn window-xp-close">
                <img src="/close.png" alt="close" />
              </button>
            )}
          </div>
        </div>
        <div className="window-xp-content">
          {children}
        </div>
      </div>
    </Draggable>
  )
);

Window.displayName = "Window";
export default Window;