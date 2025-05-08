"use client"

import { useRouter } from   "next/navigation";

export default function CVResume() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-black"  >CV Resume</h1>
    </div>
  );
}

