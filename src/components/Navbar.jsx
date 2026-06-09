import { Wallet, Star, Home } from 'lucide-react';

export default function Navbar({ tengeWallet, globalPoints, onHome }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-md border-b border-violet-100 pt-safe">
      <div className="max-w-lg mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        <button
          onClick={onHome}
          className="touch-target shrink-0 flex items-center justify-center rounded-xl text-violet-700 active:bg-violet-50"
          aria-label="Үй"
        >
          <Home size={22} />
        </button>

        <h1 className="text-sm font-extrabold text-violet-800 text-center truncate min-w-0">
          Нұраділ Ойыны
        </h1>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-full text-xs font-bold border border-amber-200 min-h-[32px]">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{globalPoints}</span>
          </div>
          <div
            className="flex items-center gap-1 bg-green-500 text-white px-2.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm min-h-[32px]"
            title={`Жинаған ақшаң: ${tengeWallet} ₸`}
          >
            <Wallet size={14} />
            <span>{tengeWallet} ₸</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
