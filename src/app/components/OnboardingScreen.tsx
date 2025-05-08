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
      <div className="flex flex-col items-center justify-end-safe w-1/2" >
        <img src="/assets/icons/windows_logo.png" alt="onboarding" className="w-80 h-auto" />
        <h2 className="text-2xl mb-8 text-white">To begin, click at my picture</h2>
      </div>
      <div className="flex flex-col items-center justify-items-end w-1/2">
      <button
          className="flex flex-col items-center bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-100"
        onClick={onSelect}
      >
        <span className="mb-2">🎸</span>
      </button>
      <span className="text-lg font-bold">Akira</span>
      </div>
      
    </div>
  );
} 