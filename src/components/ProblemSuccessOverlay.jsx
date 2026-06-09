import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProblemSuccessOverlay({ tenge, onDone }) {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 30, 60]);
    }
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-black/25 backdrop-blur-[2px] animate-fade-in">
      <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-green-400 animate-bounce-once">
        <CheckCircle2 size={72} className="mx-auto text-green-500 mb-3" strokeWidth={2.5} />
        <p className="text-3xl font-extrabold text-green-600">Дұрыс!</p>
        {tenge > 0 ? (
          <p className="text-2xl font-extrabold text-green-500 mt-2">+{tenge} ₸</p>
        ) : (
          <p className="text-sm font-bold text-gray-500 mt-2">Жарайсың!</p>
        )}
        <p className="text-sm text-violet-600 font-semibold mt-3">Керемет жұмыс! 🎉</p>
      </div>
    </div>
  );
}
