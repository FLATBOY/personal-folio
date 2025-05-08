export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      <img src="/assets/icons/windows_logo.png" alt="logo" className="w-120 h-auto" />
      <img src="/assets/images/loader.gif" alt="loader" className="w-200 h-auto" />
    </div>
  );
} 

