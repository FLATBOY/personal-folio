import Image from "next/image";
export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-black text-white">
      <Image src="/assets/icons/windows_logo.png" alt="logo" className="w-120 h-auto" />
      <Image src="/assets/images/loader.gif" alt="loader" className="w-70 h-auto" />
    </div>
  );
} 

