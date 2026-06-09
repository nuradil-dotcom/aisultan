import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ReasoningGame({ problem, onProblemComplete, onProblemGiveUp, onStruggle }) {
  const [selected, setSelected] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(false);

  const handleChoice = (choice) => {
    if (attempts >= 2) return;
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

  const locked = attempts >= 2;

  const successBanner = correct && (
    <div className="flex items-center justify-center gap-2 bg-green-100 border-2 border-green-400 rounded-2xl p-3 animate-fade-in">
      <CheckCircle2 className="text-green-600" size={28} />
      <p className="text-green-700 font-extrabold text-lg">Дұрыс!</p>
    </div>
  );

  if (problem.kind === 'deduce') {
    return (
      <div className="space-y-5">
        {successBanner}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-gray-800 leading-relaxed font-medium text-lg">{problem.story}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {problem.choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              disabled={locked}
              className={`p-4 rounded-2xl font-bold text-base border-2 transition-all ${
                selected === choice
                  ? choice === problem.answer
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                  : 'bg-white border-violet-200 active:border-violet-400'
              } ${locked ? 'opacity-50 cursor-not-allowed' : 'touch-target active:scale-95'}`}
            >
              {choice}
            </button>
          ))}
        </div>
        {wrong && !locked && <p className="text-center text-red-600 font-bold">Қате! Әңгімені қайта оқы!</p>}
        {locked && <p className="text-center text-amber-700 font-bold text-sm">2 рет қате — келесі сұрақ!</p>}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {successBanner}
      <p className="text-center font-bold text-violet-800">Артықсызын тап!</p>
      <div className="flex justify-center gap-4 text-4xl flex-wrap">
        {problem.items.map((item, i) => (
          <span key={`${item}-${i}`} className="bg-white rounded-xl p-3 shadow">{item}</span>
        ))}
      </div>
      <p className="text-center text-xs text-gray-500">Төменнен дұрыс жауапты тап (басқалар шатастыру)</p>
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {problem.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={locked}
            className={`text-2xl p-3 rounded-2xl font-bold border-2 transition-all ${
              selected === choice
                ? choice === problem.answer
                  ? 'bg-green-100 border-green-400'
                  : 'bg-red-100 border-red-400'
                : 'bg-white border-violet-200 active:border-violet-400'
            } ${locked ? 'opacity-50 cursor-not-allowed' : 'touch-target active:scale-95'}`}
          >
            {choice}
          </button>
        ))}
      </div>
      {wrong && !locked && <p className="text-center text-red-600 font-bold">Қате! Топты қайта ойла!</p>}
      {locked && <p className="text-center text-amber-700 font-bold text-sm">2 рет қате — келесі сұрақ!</p>}
    </div>
  );
}
