import { Lock, Check, Crown, Star } from 'lucide-react';
import { MODULES } from '../data/curriculum';

export default function LevelMap({
  onSelectLevel,
  isLevelUnlocked,
  isLevelCompleted,
  bossPending,
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-extrabold text-violet-800 mb-2">
          Ойын деңгейлері
        </h2>
        <p className="text-gray-600 text-lg">
          4 модуль, 40 деңгей — әрқайсысында жаңа білім!
        </p>
        {bossPending && (
          <div className="mt-4 bg-amber-100 border-2 border-amber-400 text-amber-800 rounded-xl p-4 font-bold">
            ⚠️ Сыйлықты алу үшін Нұраділ ағаңа бар! Келесі деңгейлер уақытша жабық.
          </div>
        )}
      </header>

      {MODULES.map((mod) => (
        <section
          key={mod.id}
          className={`bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-white`}
        >
          <div className={`bg-gradient-to-r ${mod.color} px-6 py-4`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{mod.icon}</span>
              <div>
                <h3 className="text-xl font-extrabold text-white">{mod.title}</h3>
                <p className="text-white/80 text-sm font-semibold">{mod.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-4 grid grid-cols-5 sm:grid-cols-10 gap-2">
            {mod.levels.map((level) => {
              const unlocked = isLevelUnlocked(mod.id, level.id);
              const completed = isLevelCompleted(mod.id, level.id);
              const isBoss = level.isBoss;

              return (
                <button
                  key={level.id}
                  disabled={!unlocked}
                  onClick={() => unlocked && onSelectLevel(mod.id, level.id)}
                  className={`
                    relative aspect-square rounded-2xl font-bold text-sm flex flex-col items-center justify-center gap-0.5 transition-all
                    ${unlocked
                      ? isBoss
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:scale-105 shadow-md hover:shadow-lg'
                        : completed
                          ? 'bg-green-100 text-green-700 border-2 border-green-300 hover:scale-105'
                          : 'bg-violet-50 text-violet-700 border-2 border-violet-200 hover:scale-105 hover:bg-violet-100'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                  title={level.title}
                >
                  {isBoss ? (
                    <Crown size={18} />
                  ) : completed ? (
                    <Check size={16} />
                  ) : unlocked ? (
                    <Star size={14} />
                  ) : (
                    <Lock size={14} />
                  )}
                  <span>{level.id}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
