"use client";
import React from 'react';
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import NavBar from "./components/NavBar";
<<<<<<< HEAD
import WindowManager from './components/WindowManager';
=======
import WindowManager, { WindowData } from './components/WindowManager';
>>>>>>> 01cfbf8f4879c26d333d80dad81f3eff885bb120

export default function Home() {
  const [screen, setScreen] = useState<'loading' | 'onboarding' | 'home'>('loading');

  useEffect(() => {
    if (screen === 'loading') {
      const timer = setTimeout(() => setScreen('onboarding'), 1500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  if (screen === 'loading') return <LoadingScreen />;
  return (
    <main className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen overflow-hidden">
      <NavBar />
      <HomeScreen />
      <WindowManager windows={[]
        
      } />
    </main>
  );
}

// // Example windows for demonstration
// const demoWindows: WindowData[] = [
//   {
//     id: 'window1',
//     title: 'About Me',
//     icon: '/assets/icons/user.png',
//     content: (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">About Me</h2>
//         <p className="mb-4">This is a demo window with some sample content.</p>
//         <p>You can minimize this window to see it appear in the taskbar!</p>
//       </div>
//     ),
//     width: 600,
//     defaultPosition: { x: 100, y: 100 },
//     height: 400
//   },
//   {
//     id: 'window2',
//     title: 'Projects',
//     icon: '/assets/icons/folder.png',
//     content: (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">My Projects</h2>
//         <ul className="list-disc pl-6">
//           <li className="mb-2">Project 1 - Description</li>
//           <li className="mb-2">Project 2 - Description</li>
//           <li className="mb-2">Project 3 - Description</li>
//         </ul>
//       </div>
//     ),
//     defaultPosition: { x: 200, y: 150 },
//     width: 700,
//     height: 500
//   },
//   {
//     id: 'window3',
//     title: 'Contact',
//     icon: '/assets/icons/mail.png',
//     content: (
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
//         <p className="mb-2">Email: example@example.com</p>
//         <p className="mb-2">GitHub: github.com/username</p>
//         <p className="mb-2">LinkedIn: linkedin.com/in/username</p>
//       </div>
//     ),
//     defaultPosition: { x: 300, y: 200 },
//     width: 500,
//     height: 350
//   }
// ];

