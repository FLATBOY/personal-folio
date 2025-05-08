
export default function HomeScreen() {
  return (
    <div className="relative min-h-screen w-full">
      <img src="/assets/wallpapper.jpg" alt="background" className="w-full h-full object-cover" />
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