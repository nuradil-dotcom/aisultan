import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function MemoryGame({ problem, onProblemComplete, onProblemGiveUp, onStruggle }) {
  const [phase, setPhase] = useState('show');
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setPhase('show');
    setSelected(null);
    setWrong(false);
    setAttempts(0);
    setCorrect(false);
    const t = setTimeout(() => setPhase('answer'), problem.displayMs || 2500);
    return () => clearTimeout(t);
  }, [problem]);

  const handleChoice = (choice) => {
    if (phase !== 'answer' || attempts >= 2) return;
    setSelected(choice);
    if (choice === problem.answer) {
      setCorrect(true);
      setTimeout(onProblemComplete, 500);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setWrong(true);
      onStruggle?.();
      if (next >= 2) {
        setTimeout(() => onProblemGiveUp?.(), 1500);
      } else {
        setTimeout(() => { setWrong(false); setSelected(null); }, 800);
      }
    }
  };

  const displaySequence = phase === 'show'
    ? problem.sequence
    : problem.kind === 'next'
      ? [...problem.sequence]
      : problem.sequence;

  return (
    <div className="space-y-6">
      {correct && (
        <div className="flex items-center justify-center gap-2 bg-green-100 border-2 border-green-400 rounded-2xl p-3 animate-fade-in">
          <CheckCircle2 className="text-green-600" size={28} />
          <p className="text-green-700 font-extrabold text-lg">Дұрыс!</p>
        </div>
      )}
      <p className="text-center text-sm font-bold text-violet-700">
        {phase === 'show' ? '👀 Жақсы қарап ал!' : problem.kind === 'missing' ? '❓ орнына не болды?' : 'Келесі не?'}
      </p>

      <div className="flex justify-center gap-2 flex-wrap text-3xl bg-white rounded-2xl p-4 shadow-inner min-h-[80px] items-center">
        {displaySequence.map((item, i) => (
          <span key={i} className="font-bold animate-fade-in">{item}</span>
        ))}
        {phase === 'answer' && problem.kind === 'next' && (
          <span className="w-12 h-12 border-4 border-dashed border-violet-400 rounded-xl flex items-center justify-center text-violet-500 font-bold">?</span>
        )}
      </div>

      {phase === 'answer' && (
        <>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {problem.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleChoice(choice)}
                disabled={attempts >= 2}
                className={`touch-target text-2xl p-3 rounded-2xl font-bold border-2 transition-all active:scale-95 ${
                  selected === choice
                    ? choice === problem.answer
                      ? 'bg-green-100 border-green-400'
                      : 'bg-red-100 border-red-400'
                    : 'bg-white border-violet-200 active:border-violet-400'
                } ${attempts >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {choice}
              </button>
            ))}
          </div>
          {attempts >= 2 && selected !== problem.answer && (
            <p className="text-center text-amber-700 font-bold text-sm">
              2 рет қателестің. Келесі сұраққа өт — жауапты айтпаймын!
            </p>
          )}
        </>
      )}

      {phase === 'show' && (
        <p className="text-center text-xs text-gray-400">Жақында жасырылады...</p>
      )}

      {wrong && attempts < 2 && (
        <p className="text-center text-red-600 font-bold">Қате! Есте сақтап қайта ойла!</p>
      )}
    </div>
  );
}
