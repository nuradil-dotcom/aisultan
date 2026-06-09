import { useState } from 'react';

function MiniGrid({ cells, size = 'md' }) {
  const cls = size === 'sm' ? 'w-9 h-9 text-sm' : 'w-10 h-10 text-base';
  return (
    <div className="inline-grid grid-cols-3 gap-0.5 bg-gray-200 p-1.5 rounded-lg">
      {cells.map((cell, i) => (
        <div key={i} className={`${cls} flex items-center justify-center rounded bg-white font-bold`}>
          {cell}
        </div>
      ))}
    </div>
  );
}

export default function SpatialGame({ problem, onProblemComplete, onProblemGiveUp, onStruggle }) {
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePick = (idx) => {
    if (attempts >= 2) return;
    setSelected(idx);
    if (idx === problem.answer) {
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

  const locked = attempts >= 2;

  return (
    <div className="space-y-6">
      <p className="text-center font-bold text-violet-800">{problem.prompt}</p>

      <div className="flex justify-center">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Бастапқы:</p>
          <MiniGrid cells={problem.grid} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {problem.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handlePick(idx)}
            disabled={locked}
            className={`p-3 rounded-2xl border-2 transition-all flex justify-center min-h-[88px] ${
              selected === idx
                ? idx === problem.answer
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-400 bg-red-50'
                : 'border-violet-200 active:border-violet-400 active:scale-95'
            } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <MiniGrid cells={opt} size="sm" />
          </button>
        ))}
      </div>

      {wrong && !locked && (
        <p className="text-center text-red-600 font-bold">Қате! Бұруды қайта ойла!</p>
      )}
      {locked && (
        <p className="text-center text-amber-700 font-bold text-sm">2 рет қате — келесі сұрақ!</p>
      )}
    </div>
  );
}
