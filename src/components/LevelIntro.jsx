import { BookOpen, Coins, Star, Play, Lightbulb } from 'lucide-react';
import { MODULE_LEARNING, getLevelLearning } from '../data/learning';
import { getLevelRewards, BOSS_REWARD, DIFFICULTY_LABELS, HINT_COST_PER_PROBLEM } from '../data/rewards';

export default function LevelIntro({ mod, level, onStart, onBack, isBoss }) {
  const learning = getLevelLearning(level);
  const modLearn = MODULE_LEARNING[mod.id];
  const rewards = !isBoss ? getLevelRewards(level.id) : null;

  return (
    <div className="max-w-lg mx-auto px-3 py-6 pb-safe">
      <button onClick={onBack} className="touch-target text-violet-600 font-bold mb-5 active:opacity-70">
        ← Артқа
      </button>

      <div className={`rounded-3xl overflow-hidden shadow-xl border-4 ${isBoss ? 'border-amber-400' : 'border-violet-200'}`}>
        <div className={`bg-gradient-to-r ${mod.color} px-6 py-5 text-white`}>
          <span className="text-4xl">{modLearn.emoji}</span>
          <h2 className="text-2xl font-extrabold mt-2">{level.title}</h2>
          <p className="text-white/80 font-semibold">{mod.title}</p>
          {rewards && (
            <p className="text-white/70 text-sm mt-1 font-semibold">
              {DIFFICULTY_LABELS[rewards.difficulty]} деңгей
            </p>
          )}
        </div>

        <div className="bg-white p-6 space-y-5">
          <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <BookOpen className="text-blue-500 shrink-0 mt-0.5" size={22} />
            <div>
              <p className="font-bold text-blue-800 text-sm mb-1">Бүгін не істейміз?</p>
              <p className="text-gray-700 leading-relaxed text-lg font-medium">{learning.learn}</p>
            </div>
          </div>

          {!isBoss && rewards && (
            <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 space-y-2">
              <p className="font-bold text-violet-800 text-sm">Қанша сұрақ?</p>
              <p className="text-gray-700">
                <span className="font-extrabold text-violet-700">{rewards.problemCount} сұрақ</span>
                {' '}· әр дұрыс жауапқа <span className="font-bold text-green-600">+{rewards.tengePerProblem} ₸</span>
                {' '}· соңында <span className="font-bold text-green-600">+{rewards.levelBonus} ₸</span> бонус
              </p>
              <p className="text-sm text-gray-500">
                Барлығы: <span className="font-bold text-green-700">{rewards.maxTenge} ₸</span> дейін
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 bg-amber-50 rounded-2xl p-3 text-center border border-amber-100">
              <Star size={20} className="mx-auto text-amber-500 mb-1" />
              <p className="font-extrabold text-amber-700">
                +{isBoss ? BOSS_REWARD.points : `${rewards?.problemCount || 0}+5`}
              </p>
              <p className="text-xs text-amber-600">ұпай</p>
            </div>
            <div className="flex-1 bg-green-50 rounded-2xl p-3 text-center border border-green-100">
              <Coins size={20} className="mx-auto text-green-600 mb-1" />
              <p className="font-extrabold text-green-700">
                +{isBoss ? BOSS_REWARD.tenge : rewards?.maxTenge} ₸
              </p>
              <p className="text-xs text-green-600">ақша</p>
            </div>
          </div>

          {!isBoss && (
            <div className="flex items-start gap-2 bg-amber-50 rounded-2xl p-3 border border-amber-100">
              <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-amber-800">
                Кеңес жоқ — өзің ойла! 🦉 батырмасынан бір рет {HINT_COST_PER_PROBLEM} ₸ төлеп аласың.
              </p>
            </div>
          )}

          {isBoss && (
            <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-4 text-amber-800 font-bold text-center">
              ⚔️ Босс Квест! 7 сұрақ — көмекші жоқ, өз күшіңмен жең!
            </div>
          )}

          <button
            onClick={onStart}
            className={`w-full flex items-center justify-center gap-2 py-4 min-h-[56px] rounded-2xl text-white text-xl font-extrabold shadow-lg active:scale-[0.98] transition-transform ${
              isBoss
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gradient-to-r from-violet-500 to-purple-600'
            }`}
          >
            <Play size={24} />
            Бастаймын!
          </button>
        </div>
      </div>
    </div>
  );
}
