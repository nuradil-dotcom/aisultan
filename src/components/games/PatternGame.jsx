import { useState } from 'react';

export default function PatternGame({ problem, onProblemComplete, onProblemGiveUp, onStruggle }) {
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChoice = (choice) => {
    if (attempts >= 2) return;
    setSelected(choice);
    if (choice === problem.answer) {
      setTimeout(onProblemComplete, 400);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center gap-2 flex-wrap text-2xl bg-white rounded-2xl p-4 shadow-inner">
        {problem.sequence.map((item, i) => (
          <span key={i} className="font-bold">{item}</span>
        ))}
        <span className="w-12 h-12 border-4 border-dashed border-violet-400 rounded-xl flex items-center justify-center text-violet-500 font-bold">?</span>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {problem.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`touch-target text-xl p-3 rounded-2xl font-bold transition-all border-2 ${
              selected === choice
                ? choice === problem.answer
                  ? 'bg-green-100 border-green-400 scale-105'
                  : 'bg-red-100 border-red-400 shake'
                : 'bg-white border-violet-200 active:border-violet-400 active:scale-95'
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      {wrong && (
        <div className="text-center bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-red-600 font-bold">Қате! Үлгіні қайта оқы!</p>
        </div>
      )}
    </div>
  );
}
