import { useState } from 'react';
import { Coins, X, Lightbulb } from 'lucide-react';
import { HINT_COST_PER_PROBLEM } from '../data/rewards';

export default function MascotHelper({
  hintText,
  hintUsed,
  onBuyHint,
  canAfford,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed z-30 flex flex-col items-end gap-2 pointer-events-none"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', right: 'max(1rem, env(safe-area-inset-right))' }}
    >
      {open && (
        <div className="pointer-events-auto w-[min(260px,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border-2 border-violet-200 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-3 py-2 bg-violet-50 border-b border-violet-100">
            <span className="font-bold text-violet-800 text-sm">🦉 Кеңес</span>
            <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-violet-100 text-violet-600">
              <X size={16} />
            </button>
          </div>
          <div className="p-3 space-y-2">
            {hintUsed ? (
              <p className="text-sm text-violet-700 bg-violet-50 rounded-lg p-2 border border-violet-200">
                {hintText}
              </p>
            ) : (
              <>
                <p className="text-xs text-gray-500">
                  Бір сұраққа бір кеңес. Ақшаңнан төле.
                </p>
                <button
                  onClick={() => { onBuyHint(); setOpen(true); }}
                  disabled={!canAfford}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm ${
                    canAfford
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Coins size={16} />
                  Кеңес ал ({HINT_COST_PER_PROBLEM} ₸)
                </button>
                {!canAfford && (
                  <p className="text-xs text-red-500 text-center">Ақша жетпейді!</p>
                )}
              </>
            )}
            {hintUsed && (
              <p className="text-xs text-gray-400 text-center">Келесі сұрақта жаңа кеңес.</p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className={`pointer-events-auto relative w-14 h-14 rounded-full shadow-xl border-4 border-white flex items-center justify-center text-2xl transition-all active:scale-95 ${
          hintUsed ? 'bg-violet-500' : 'bg-amber-500'
        }`}
        aria-label="Кеңес"
      >
        {open ? <X size={22} className="text-white" /> : hintUsed ? <Lightbulb size={22} className="text-white" /> : '🦉'}
      </button>
    </div>
  );
}
