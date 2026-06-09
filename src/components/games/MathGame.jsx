import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function MathGame({ problem, levelType, onProblemComplete, onStruggle }) {
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (correct) return;
    let isRight = false;
    if (levelType === 'math-add' || levelType === 'math-sub' || levelType === 'math-mixed') {
      isRight = Number(answer) === problem.answer;
    } else if (levelType === 'math-sign') {
      isRight = answer === problem.answer;
    } else if (levelType === 'math-double' || levelType === 'math-half') {
      isRight = Number(answer) === problem.answer;
    }
    if (isRight) {
      setCorrect(true);
      setWrong(false);
      setTimeout(onProblemComplete, 500);
    } else {
      setWrong(true);
      onStruggle?.();
      setTimeout(() => setWrong(false), 600);
    }
  };

  const successBanner = correct && (
    <div className="flex items-center justify-center gap-2 bg-green-100 border-2 border-green-400 rounded-2xl p-3 animate-fade-in">
      <CheckCircle2 className="text-green-600" size={28} />
      <p className="text-green-700 font-extrabold text-lg">Дұрыс!</p>
    </div>
  );

  if (levelType === 'math-sign') {
    return (
      <div className="text-center space-y-4">
        {successBanner}
        <p className="text-3xl font-bold text-violet-800">
          {problem.a} <span className="text-rose-500">?</span> {problem.b} = {problem.result}
        </p>
        <div className="flex justify-center gap-4">
          {['+', '-'].map((sign) => (
            <button
              key={sign}
              onClick={() => setAnswer(sign)}
              className={`w-16 h-16 text-3xl font-bold rounded-2xl border-2 transition-all ${
                answer === sign ? 'bg-violet-500 text-white border-violet-600' : 'bg-white border-violet-200'
              }`}
            >
              {sign}
            </button>
          ))}
        </div>
        <button
          onClick={check}
          disabled={!answer || correct}
          className="touch-target px-6 py-3 bg-green-500 text-white font-extrabold rounded-xl disabled:opacity-50"
        >
          ✓ Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта ойла!</p>}
      </div>
    );
  }

  if (levelType === 'math-double') {
    return (
      <div className="text-center space-y-4">
        {successBanner}
        <p className="text-2xl font-bold text-violet-800">
          {problem.base} санын екі есе арттыр! Не шығады?
        </p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
        />
        <button onClick={check} disabled={correct} className="touch-target block mx-auto px-6 py-3 bg-green-500 text-white font-extrabold rounded-xl disabled:opacity-70">
          ✓ Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
      </div>
    );
  }

  if (levelType === 'math-half') {
    return (
      <div className="text-center space-y-4">
        {successBanner}
        <p className="text-2xl font-bold text-violet-800">
          {problem.base} санын жартыға бөл! Не шығады?
        </p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
        />
        <button onClick={check} disabled={correct} className="touch-target block mx-auto px-6 py-3 bg-green-500 text-white font-extrabold rounded-xl disabled:opacity-70">
          ✓ Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      {successBanner}
      <p className="text-3xl font-bold text-violet-800">
        {problem.a} {problem.op} {problem.b} = ?
      </p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
      />
      <button onClick={check} disabled={correct} className="touch-target block mx-auto px-6 py-3 bg-green-500 text-white font-extrabold rounded-xl disabled:opacity-70">
        ✓ Тексеру
      </button>
      {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
    </div>
  );
}
