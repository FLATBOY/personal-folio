import React, { useState, useCallback } from 'react';
import Window from './Window/Window';
import TaskBar from './Taskbar/TaskBar';

export interface WindowData {
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
}

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

const WindowManager: React.FC<{ windows: WindowData[] }> = ({ windows }) => {
  const [windowStates, setWindowStates] = useState<Record<string, WindowState>>(() => {
    // Initialize window states
    const initialStates: Record<string, WindowState> = {};
    windows.forEach((window, index) => {
      initialStates[window.id] = {
        isOpen: true,
        isMinimized: false,
        zIndex: 1000 + index
      };
    });
    return initialStates;
  });

  // Keep track of the highest z-index to bring windows to front when clicked
  const [highestZIndex, setHighestZIndex] = useState(1000 + windows.length);

  const handleClose = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false,
        isMinimized: false
      }
    }));
  }, []);

  const handleMinimize = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: true
      }
    }));
  }, []);

  const handleRestore = useCallback((windowId: string) => {
    // Bring the window to front when restored
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: false,
        zIndex: newZIndex
      }
    }));
  }, [highestZIndex]);

  const handleWindowClick = useCallback((windowId: string) => {
    // Bring the clicked window to front
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        zIndex: newZIndex
      }
    }));
  }, [highestZIndex]);

  // Get minimized windows for the taskbar
  const minimizedWindows = windows
    .filter(window => windowStates[window.id]?.isOpen && windowStates[window.id]?.isMinimized)
    .map(window => ({
      id: window.id,
      title: window.title,
      icon: window.icon
    }));

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Render all non-minimized windows */}
        {windows.map(window => {
          const state = windowStates[window.id];
          
          // Skip if window is closed or minimized
          if (!state?.isOpen || state.isMinimized) return null;

          return (
            <Window
              key={window.id}
              windowId={window.id}
              title={window.title}
              icon={window.icon}
              defaultPosition={window.defaultPosition}
              width={window.width}
              height={window.height}
              zIndex={state.zIndex}
              onClose={() => handleClose(window.id)}
              onMinimize={() => handleMinimize(window.id)}
              onClick={() => handleWindowClick(window.id)}
              isActive={state.zIndex === highestZIndex}
            >
              {window.content}
            </Window>
          );
        })}
      </div>

      {/* TaskBar for minimized windows */}
      <TaskBar
        minimizedWindows={minimizedWindows}
        onRestoreWindow={handleRestore}
      />
    </>
  );
};

export default WindowManager; 