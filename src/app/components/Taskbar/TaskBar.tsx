import React from 'react';
import Image from 'next/image';

interface MinimizedWindow {
  id: string;
  title: string;
  icon?: string;
}

interface TaskBarProps {
  minimizedWindows: MinimizedWindow[];
  onRestoreWindow: (windowId: string) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ minimizedWindows, onRestoreWindow }) => {
  const handleClick = (windowId: string) => {
    onRestoreWindow(windowId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, windowId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onRestoreWindow(windowId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800/80 backdrop-blur-md border-t border-gray-700 flex items-center px-2 z-50">
      {minimizedWindows.map((window) => (
        <div
          key={window.id}
          onClick={() => handleClick(window.id)}
          onKeyDown={(e) => handleKeyDown(e, window.id)}
          className="h-10 px-3 mx-1 flex items-center bg-gray-700/80 hover:bg-gray-600/80 rounded cursor-pointer transition-colors duration-200"
          tabIndex={0}
          aria-label={`Restore ${window.title}`}
          role="button"
        >
          {window.icon ? (
            <Image 
              src={window.icon} 
              alt="" 
              width={20} 
              height={20} 
              className="mr-2" 
            />
          ) : (
            <div className="w-5 h-5 bg-blue-500 rounded-sm mr-2" />
          )}
          <span className="text-white text-sm truncate max-w-[120px]">{window.title}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskBar;
