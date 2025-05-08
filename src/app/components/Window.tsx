import Draggable from "react-draggable";
import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  defaultPosition?: { x: number; y: number };
}

export default function Window({ title, children, onClose, defaultPosition = { x: 0, y: 0 } }: WindowProps) {
  return (
    <Draggable defaultPosition={defaultPosition} handle=".window-handle">
      <div className="absolute bg-white rounded-lg shadow-lg overflow-hidden min-w-[400px] min-h-[300px]">
        <div className="window-handle bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move">
          <span className="font-medium">{title}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-300 rounded"
            >
              ×
            </button>
          )}
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </Draggable>
  );
} 