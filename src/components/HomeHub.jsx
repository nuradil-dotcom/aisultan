import { useState } from 'react';
import { BookOpen, Gamepad2, Play, Trophy, Target, Check, Gift } from 'lucide-react';
import { getRank, SAVINGS_GOALS } from '../data/goals';
import { MODULES } from '../data/curriculum';

export default function HomeHub({
  globalPoints,
  tengeWallet,
  totalEarned,
  completedCount,
  claimedGoals,
  onClaimGoal,
  onPlay,
  onLearn,
  onContinue,
  nextLevel,
}) {
  const [message, setMessage] = useState(null);
  const rank = getRank(globalPoints);
  const totalLevels = MODULES.reduce((s, m) => s + m.levels.length, 0);

  const nextGoal = SAVINGS_GOALS.find((g) => !claimedGoals.includes(g.id));
  const goalProgress = nextGoal
    ? Math.min(100, (tengeWallet / nextGoal.target) * 100)
    : 100;

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleClaim = (goal) => {
    if (claimedGoals.includes(goal.id)) return;
    if (tengeWallet < goal.target) {
      showMsg(`Әлі ${goal.target - tengeWallet} ₸ керек!`, 'error');
      return;
    }
    if (onClaimGoal(goal.id, goal.target)) {
      showMsg(`${goal.emoji} ${goal.name} — Нұраділ ағаңа бар!`, 'success');
    }
  };

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
            <p className="text-green-600 font-extrabold text-lg mt-1">{tengeWallet} ₸</p>
            <p className="text-xs text-gray-400">Барлығы жиналған: {totalEarned} ₸</p>
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-3 rounded-xl font-bold text-center text-sm ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {nextGoal && (
          <div className="mt-4 bg-amber-50 rounded-2xl p-3 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800">
                Келесі арман: {nextGoal.emoji} {nextGoal.name}
              </span>
              <span className="text-xs text-amber-600 ml-auto">{nextGoal.target} ₸</span>
            </div>
            <div className="h-3 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-700"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <p className="text-xs text-amber-600 mt-1 text-center font-semibold">
              {tengeWallet} / {nextGoal.target} ₸
              {tengeWallet < nextGoal.target
                ? ` — тағы ${nextGoal.target - tengeWallet} ₸ керек!`
                : ' — дайын!'}
            </p>
            {tengeWallet >= nextGoal.target && (
              <button
                onClick={() => handleClaim(nextGoal)}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600"
              >
                <Gift size={18} />
                Сыйлықты ал!
              </button>
            )}
          </div>
        )}

        {!nextGoal && (
          <p className="mt-4 text-center text-sm font-bold text-violet-600">
            🎉 Барлық арман сыйлықтар алынды!
          </p>
        )}
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

      <div className="bg-white rounded-2xl p-4 border border-violet-100">
        <p className="text-sm font-bold text-violet-800 mb-3 flex items-center gap-2">
          <Gift size={16} />
          Арман сыйлықтар
        </p>
        <div className="space-y-2">
          {SAVINGS_GOALS.map((goal) => {
            const claimed = claimedGoals.includes(goal.id);
            const ready = !claimed && tengeWallet >= goal.target;
            return (
              <div
                key={goal.id}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm ${
                  claimed ? 'bg-green-50 text-green-700' : ready ? 'bg-amber-50' : 'bg-gray-50'
                }`}
              >
                <span className="text-xl">{goal.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold">{goal.name}</p>
                  <p className="text-xs text-gray-500">{goal.target} ₸</p>
                </div>
                {claimed ? (
                  <Check size={18} className="text-green-600" />
                ) : ready ? (
                  <button
                    onClick={() => handleClaim(goal)}
                    className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg"
                  >
                    Ал!
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 font-semibold">
                    {Math.round(Math.min(100, (tengeWallet / goal.target) * 100))}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
