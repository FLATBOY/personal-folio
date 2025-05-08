"use client";
import { useEffect, useState } from "react";

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl mb-4">Microsoft® Windows<sup>®</sup> XP</h2>
      <div className="w-48 h-4 bg-gray-800 rounded overflow-hidden">
        <div className="w-1/3 h-full bg-blue-500 animate-pulse"></div>
      </div>
    </div>
  );
}

function OnboardingScreen({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
      <h2 className="text-2xl mb-8 text-white">To begin, click your user name</h2>
      <button
        className="flex flex-col items-center bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-100"
        onClick={onSelect}
      >
        <span className="mb-2">🎸</span>
        <span className="text-lg font-bold">Nathan</span>
      </button>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="relative min-h-screen w-full" style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp2549277.jpg)', backgroundSize: 'cover' }}>
      <div className="absolute bottom-4 left-4 flex gap-8">
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-3xl">📄</span>
          <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">CV-Resume</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-3xl">💻</span>
          <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">Projects</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-3xl">👤</span>
          <span className="text-white bg-black bg-opacity-50 px-2 rounded mt-1">About Me</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<'loading' | 'onboarding' | 'home'>('loading');

  useEffect(() => {
    if (screen === 'loading') {
      const timer = setTimeout(() => setScreen('onboarding'), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'onboarding') return <OnboardingScreen onSelect={() => setScreen('home')} />;
  return <HomeScreen />;
}
