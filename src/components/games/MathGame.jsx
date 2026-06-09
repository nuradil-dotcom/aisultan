import { useState } from 'react';

export default function MathGame({ problem, levelType, onProblemComplete, onStruggle }) {
  const [answer, setAnswer] = useState('');
  const [wrong, setWrong] = useState(false);

  const check = () => {
    let correct = false;
    if (levelType === 'math-add' || levelType === 'math-sub' || levelType === 'math-mixed') {
      correct = Number(answer) === problem.answer;
    } else if (levelType === 'math-sign') {
      correct = answer === problem.answer;
    } else if (levelType === 'math-double' || levelType === 'math-half') {
      correct = Number(answer) === problem.answer;
    }
    if (correct) {
      onProblemComplete();
    } else {
      setWrong(true);
      onStruggle?.();
      setTimeout(() => setWrong(false), 600);
    }
  };

  if (levelType === 'math-sign') {
    return (
      <div className="text-center space-y-4">
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
          disabled={!answer}
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-xl disabled:opacity-50"
        >
          Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта ойла!</p>}
      </div>
    );
  }

  if (levelType === 'math-double') {
    return (
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold text-violet-800">
          {problem.base} санын екі есе арттыр! Не шығады?
        </p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
        />
        <button onClick={check} className="block mx-auto px-6 py-2 bg-green-500 text-white font-bold rounded-xl">
          Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
      </div>
    );
  }

  if (levelType === 'math-half') {
    return (
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold text-violet-800">
          {problem.base} санын жартыға бөл! Не шығады?
        </p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
        />
        <button onClick={check} className="block mx-auto px-6 py-2 bg-green-500 text-white font-bold rounded-xl">
          Тексеру
        </button>
        {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <p className="text-3xl font-bold text-violet-800">
        {problem.a} {problem.op} {problem.b} = ?
      </p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-24 text-3xl text-center border-2 border-violet-300 rounded-xl p-2"
      />
      <button onClick={check} className="block mx-auto px-6 py-2 bg-green-500 text-white font-bold rounded-xl">
        Тексеру
      </button>
      {wrong && <p className="text-red-500 font-bold">Қате! Қайта есепте!</p>}
    </div>
  );
}
