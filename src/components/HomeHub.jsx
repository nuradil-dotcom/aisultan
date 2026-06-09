import { BookOpen, Gamepad2, Play, Trophy } from 'lucide-react';
import { getRank } from '../data/goals';
import { MODULES } from '../data/curriculum';

export default function HomeHub({
  globalPoints,
  tengeWallet,
  completedCount,
  onPlay,
  onLearn,
  onContinue,
  nextLevel,
}) {
  const rank = getRank(globalPoints);
  const totalLevels = MODULES.reduce((s, m) => s + m.levels.length, 0);

  return (
    <div className="max-w-lg mx-auto px-3 py-5 pb-safe space-y-5">
      <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-violet-100">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
            {rank.emoji}
          </div>
          <div className="flex-1">
            <p className={`font-extrabold text-lg ${rank.color}`}>
              {rank.title}
            </p>
            <p className="text-gray-500 text-sm">{globalPoints} ұпай · {completedCount}/{totalLevels} деңгей</p>
            <p className="text-green-600 font-extrabold text-2xl mt-2">{tengeWallet} ₸</p>
          </div>
        </div>
      </div>

      {nextLevel && (
        <button
          onClick={onContinue}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-orange-400 to-rose-500 text-white p-5 rounded-3xl shadow-xl active:scale-[0.98] transition-transform animate-pulse-glow min-h-[72px]"
        >
          <Play size={32} />
          <div className="text-left">
            <p className="font-extrabold text-lg">Келесі деңгейге өт!</p>
            <p className="text-white/80 text-sm">Жалғастыру үшін басың</p>
          </div>
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={onLearn}
          className="flex items-center gap-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white p-5 rounded-3xl shadow-lg active:scale-[0.98] transition-transform min-h-[72px]"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <BookOpen size={28} />
          </div>
          <div className="text-left flex-1">
            <p className="font-extrabold text-xl">📚 Оқы</p>
            <p className="text-white/80 text-sm">70 деңгей — 7 бағыт, зерек ойлау!</p>
          </div>
          <Trophy size={24} className="text-amber-300" />
        </button>

        <button
          onClick={onPlay}
          className="flex items-center gap-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-5 rounded-3xl shadow-lg active:scale-[0.98] transition-transform min-h-[72px]"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Gamepad2 size={28} />
          </div>
          <div className="text-left flex-1">
            <p className="font-extrabold text-xl">🎮 Ойна</p>
            <p className="text-white/80 text-sm">Саяхат картасы — деңгей таңда</p>
          </div>
        </button>
      </div>
    </div>
  );
}
