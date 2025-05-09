export default function OnboardingScreen({ onSelect }: { onSelect: () => void }) {
  return (
    <div 
    className="flex flex-row items-center justify-center min-h-screen bg-blue-400" 
    style={{
      backgroundImage: `url(${'/assets/images/on-boarding.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className="flex flex-col justify-items-end w-1/2" >
        <img src="/assets/icons/windows_logo.png" alt="onboarding" className="w-60 h-auto" />
        <h2 className="text-2xl mb-8 text-white">To begin, click at my picture</h2>
      </div>
      <div className="flex flex-row items-center px-20 justify-items-end w-1/2">
        <button
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={onSelect}>
          <span className="mb-2">
            <img src="/assets/images/Akira.png" alt="Akira" className="w-32 h-32 rounded-full border-white object-cover shadow-lg" />
          </span>
        </button>
      <div className="flex flex-col px-4 justify-items-start w-1/2">
        <span className="text-4xl font-mono text-white">Akira</span>
        <span className="text-lg font-medium text-white">Intern fullstack developer</span>

      </div>
      </div>
      
    </div>
  );
} 