"use client";

import Draggable from "react-draggable"
import { useRouter } from "next/navigation";

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <div className="relative min-h-screen w-full"
    style={{
      backgroundImage: `url(${'/assets/images/wallpaper.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
        <div className="absolute bottom-4 left-4 flex gap-8">
            <Draggable>
                <div className="flex flex-col items-center cursor-pointer select-none" onDoubleClick={() => router.push('/cv')}>
                    <span className="text-3xl">📄</span>
                    <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">CV-Resume</span>
                </div>
            </Draggable>
            <Draggable>
                <div className="flex flex-col items-center cursor-pointer select-none" onDoubleClick={() => router.push('/projects')}>
                    <span className="text-3xl">💻</span>
                    <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">Projects</span>
                </div>
            </Draggable>
            <Draggable>
                <div className="flex flex-col items-center cursor-pointer select-none" onDoubleClick={() => router.push('/about')}>
                    <span className="text-3xl">👤</span>
                    <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">About Me</span>
                </div>
            </Draggable>
        </div>
      
    </div>
  );
} 