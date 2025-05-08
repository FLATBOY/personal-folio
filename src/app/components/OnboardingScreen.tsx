export default function OnboardingScreen({ onSelect }: { onSelect: () => void }) {
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