import { useEffect, useState } from 'react';
import { Coins, Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RewardCeremony({
  pointsEarned,
  tengeEarned,
  learnSummary,
  isBoss,
  problemsSolved,
  levelBonus,
  perProblemTenge,
  onContinue,
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    confetti({ particleCount: isBoss ? 200 : 120, spread: 80, origin: { y: 0.5 } });
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isBoss]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full space-y-6 animate-fade-in">
        <div className="text-7xl mb-2">{isBoss ? '🏆' : '🎉'}</div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
          {isBoss ? 'БОСС ЖЕҢІЛДІ!' : 'Керемет жұмыс!'}
        </h2>

        {!isBoss && problemsSolved && phase >= 1 && (
          <p className="text-white/80 font-semibold">
            {problemsSolved} сұрақ шештің!
            {perProblemTenge && levelBonus != null && (
              <span className="block text-sm mt-1">
                {problemsSolved}×{perProblemTenge}₸ + {levelBonus}₸ бонус
              </span>
            )}
          </p>
        )}

        {phase >= 1 && (
          <div className="flex justify-center gap-4 animate-slide-up flex-wrap">
            <div className="bg-amber-400 text-amber-900 px-6 py-4 rounded-2xl font-extrabold text-xl shadow-xl flex items-center gap-2">
              <Star size={28} className="fill-amber-700" />
              +{pointsEarned} ұпай
            </div>
            <div className="bg-green-400 text-green-900 px-6 py-4 rounded-2xl font-extrabold text-xl shadow-xl flex items-center gap-2">
              <Coins size={28} />
              +{tengeEarned} ₸
            </div>
          </div>
        )}

        {phase >= 2 && (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 text-white animate-slide-up">
            <p className="text-sm font-bold uppercase tracking-wide text-white/70 mb-2">
              📚 Не үйрендің?
            </p>
            <p className="text-lg font-semibold leading-relaxed">{learnSummary}</p>
          </div>
        )}

        {phase >= 2 && (
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 text-xl font-extrabold rounded-2xl shadow-xl hover:scale-105 transition-transform animate-slide-up"
          >
            Жалғастыру
            <ArrowRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
