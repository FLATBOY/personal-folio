"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import NavBar from "./components/NavBar";


export default function Home() {
  const [screen, setScreen] = useState<'loading' | 'onboarding' | 'home'>('loading');
  const [activeTitle, setActiveTitle] = useState("Activities");


  useEffect(() => {
    if (screen === 'loading') {
      const timer = setTimeout(() => setScreen('onboarding'), 1500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  if (screen === 'loading') return <LoadingScreen />;
  return (
    <>
    <NavBar />
    <HomeScreen setActiveTitle={setActiveTitle}/>;
  </>
  )
}
