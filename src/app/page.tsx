"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import HomeScreen from "./components/HomeScreen";

export default function Home() {
  const [screen, setScreen] = useState<'loading' | 'onboarding' | 'home'>('loading');

  useEffect(() => {
    if (screen === 'loading') {
      const timer = setTimeout(() => setScreen('onboarding'), 1000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  if (screen === 'loading') return <LoadingScreen />;
  if (screen === 'onboarding') return <OnboardingScreen onSelect={() => setScreen('home')} />;
  return <HomeScreen />;
}
