import { Lock, Check, Crown, Star, Gift } from 'lucide-react';
import { MODULES } from '../data/curriculum';
import { MODULE_LEARNING } from '../data/learning';

const PATH_OFFSETS = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: -0.3 },
  { x: 1, y: -0.6 },
  { x: 0, y: -0.9 },
  { x: -1, y: -1.2 },
  { x: -2, y: -1.2 },
  { x: -1, y: -1.5 },
  { x: 0, y: -1.8 },
  { x: 1, y: -2.1 },
];

export default function AdventureMap({
  onSelectLevel,
  isLevelUnlocked,
  isLevelCompleted,
  bossPending,
  activeModule,
  onSelectModule,
}) {
  const mod = MODULES.find((m) => m.id === activeModule) || MODULES[0];
  const modLearn = MODULE_LEARNING[mod.id];
  const completedInModule = mod.levels.filter((l) => isLevelCompleted(mod.id, l.id)).length;

  return (
    <div className="max-w-lg mx-auto px-3 py-4 pb-safe">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {MODULES.map((m) => {
          const done = m.levels.filter((l) => isLevelCompleted(m.id, l.id)).length;
          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className={`shrink-0 px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
                activeModule === m.id
                  ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {m.icon} {done}/{m.levels.length}
            </button>
          );
        })}
      </div>

      {bossPending && (
        <div className="mb-4 bg-amber-100 border-2 border-amber-400 text-amber-800 rounded-xl p-3 font-bold text-sm text-center">
          ⚠️ Сыйлықты алу үшін Нұраділ ағаңа бар!
        </div>
      )}

      <div className={`bg-gradient-to-br ${mod.color} rounded-3xl p-5 mb-6 text-white shadow-xl`}>
        <div className="flex items-center gap-3">
          <span className="text-5xl">{modLearn.emoji}</span>
          <div>
            <h2 className="text-xl font-extrabold">{mod.title}</h2>
            <p className="text-white/80 text-sm">{modLearn.intro}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(completedInModule / mod.levels.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-bold">{completedInModule}/{mod.levels.length}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {modLearn.skills.map((s) => (
            <span key={s} className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-sky-100 to-emerald-100 rounded-3xl p-6 min-h-[520px] border-4 border-emerald-200 shadow-inner overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-4 left-4 text-3xl">🌳</div>
          <div className="absolute top-12 right-6 text-2xl">🌸</div>
          <div className="absolute bottom-20 left-8 text-3xl">🍄</div>
          <div className="absolute bottom-8 right-4 text-2xl">🌻</div>
        </div>

        <div className="relative flex flex-col items-center gap-1">
          {mod.levels.map((level, idx) => {
            const offset = PATH_OFFSETS[idx] || { x: 0, y: -idx * 0.3 };
            const unlocked = isLevelUnlocked(mod.id, level.id);
            const completed = isLevelCompleted(mod.id, level.id);
            const isBoss = level.isBoss;
            const isNext = unlocked && !completed;

            return (
              <div
                key={level.id}
                className="relative flex flex-col items-center"
                style={{ marginLeft: `${offset.x * 40}px` }}
              >
                {idx > 0 && (
                  <div className={`w-1 h-6 rounded-full ${
                    completed || isLevelCompleted(mod.id, mod.levels[idx - 1].id)
                      ? 'bg-violet-400'
                      : 'bg-gray-300'
                  }`} />
                )}

                <button
                  disabled={!unlocked}
                  onClick={() => unlocked && onSelectLevel(mod.id, level.id)}
                  className={`
                    relative w-16 h-16 rounded-full font-extrabold flex flex-col items-center justify-center
                    transition-all shadow-lg border-4
                    ${!unlocked
                      ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed scale-90'
                      : isBoss
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 text-white hover:scale-110 animate-pulse-glow'
                        : completed
                          ? 'bg-green-400 border-green-300 text-white hover:scale-105'
                          : isNext
                            ? 'bg-violet-500 border-violet-300 text-white hover:scale-110 ring-4 ring-violet-200 animate-bounce-gentle'
                            : 'bg-white border-violet-300 text-violet-700 hover:scale-105'
                    }
                  `}
                  title={level.title}
                >
                  {isBoss ? (
                    <Crown size={22} />
                  ) : completed ? (
                    <Check size={20} />
                  ) : unlocked ? (
                    <Star size={16} />
                  ) : (
                    <Lock size={16} />
                  )}
                  <span className="text-xs mt-0.5">{level.id}</span>

                  {isNext && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                      ЖАҢА
                    </span>
                  )}
                </button>

                {isNext && (
                  <p className="text-xs font-bold text-violet-700 mt-1 max-w-[100px] text-center leading-tight">
                    {level.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {completedInModule === mod.levels.length && (
          <div className="mt-6 text-center bg-white/80 rounded-2xl p-4">
            <Gift size={32} className="mx-auto text-amber-500 mb-2" />
            <p className="font-extrabold text-violet-800">Модуль аяқталды! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
