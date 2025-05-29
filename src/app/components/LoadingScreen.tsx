import React from 'react';
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black text-white backdrop-blur-md"
    style={{
      backgroundImage: `url(${'/assets/Images/my_desktop.png'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backdropFilter: 'blur(20px)',
    }}
    >
      <Image 
        src="/assets/Images/avatar.png" 
        alt="Profile" 
        width={80} 
        height={80} 
        className="w-80 h-auto" />
        <div className="progress-bar px-6 m-6">
          <div className="progress-bar-fill"></div>
        </div>
    </div>
    
  );
} 

