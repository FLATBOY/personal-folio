// src/app/components/Window.tsx
import Draggable from "react-draggable";
import React, { ReactNode, useRef } from "react";
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
}

const Window = ({
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  isActive,
  defaultPosition,
}: WindowProps) => {
  const nodeRef = useRef<HTMLDivElement>(null!);
  return (
    <Draggable nodeRef={nodeRef} defaultPosition={defaultPosition} >
      <div 
        ref={nodeRef} 
        className={`window-xp ${isActive ? "active" : ""}`} 
        style={{zIndex: isActive ? 1000 : 1}}
      >
        <div className="window-xp-title-bar flex flex-row justify-between">
          <span className="window-xp-title">{title}</span>
          <div className="window-xp-btn window-xp-controls">
            {onMinimize && (<button onClick={onMinimize} className="window-xp-btn">
              <Image src="/assets/icons/minimize.png" alt="minimize" className=" w-4 h-4" />
            </button>)}
            {onMaximize && (<button onClick={onMaximize} className="window-xp-btn">
              <Image src="/assets/icons/maximize.png" alt="maximize" className=" w-4 h-4" />
            </button>)}
            {onClose && (<button onClick={onClose} className="window-xp-close">
              <span >x</span>
              {/* <img src="/assets/icons/close.png" alt="close" className="w-4 h-4" /> */}
            </button>)}
          </div>
        </div>
        <div className="window-xp-content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;