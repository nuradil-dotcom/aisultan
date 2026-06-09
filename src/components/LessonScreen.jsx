import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function LessonScreen({ lesson, onDone, onSkip }) {
  const [step, setStep] = useState(0);
  const total = lesson.steps.length;
  const current = lesson.steps[step];
  const isLast = step === total - 1;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-12">
      <div className="bg-white rounded-3xl shadow-xl border-4 border-blue-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🦉</span>
            <p className="text-sm font-semibold text-white/90">{lesson.mascot}</p>
          </div>
          <h2 className="text-xl font-extrabold">{lesson.title}</h2>
          <div className="flex gap-1.5 mt-3">
            {lesson.steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-white/70 mt-1">{step + 1} / {total} қадам</p>
        </div>

        <div className="p-6 space-y-5 min-h-[320px]">
          <h3 className="text-2xl font-extrabold text-blue-800">{current.title}</h3>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">{current.body}</p>

          <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100 text-center">
            <pre className="text-3xl font-bold whitespace-pre-wrap leading-relaxed mb-2">
              {current.visual}
            </pre>
            <p className="text-sm font-bold text-blue-600">{current.visualLabel}</p>
            {current.bad && (
              <>
                <pre className="text-2xl mt-3 text-red-400 whitespace-pre-wrap">{current.bad}</pre>
                <p className="text-sm font-bold text-red-500">{current.badLabel}</p>
              </>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-2xl"
            >
              <ChevronLeft size={20} />
              Артқа
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="px-4 py-3 text-gray-400 font-semibold text-sm rounded-2xl"
            >
              Өткізу
            </button>
          )}

          {isLast ? (
            <button
              onClick={onDone}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-extrabold text-lg rounded-2xl hover:bg-green-600 shadow-lg"
            >
              <Check size={22} />
              {lesson.ready}
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white font-extrabold text-lg rounded-2xl hover:bg-blue-600"
            >
              Келесі
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
