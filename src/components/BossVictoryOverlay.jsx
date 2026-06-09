import { useState, useCallback } from 'react';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BOSS_REWARD } from '../data/rewards';

const DEV_PATTERN = ['tl', 'tr', 'br', 'bl', 'tl'];

export default function BossVictoryOverlay({ onApprove }) {
  const [clicks, setClicks] = useState([]);

  const handleCornerClick = useCallback(
    (corner) => {
      const next = [...clicks, corner];
      if (next.length === DEV_PATTERN.length) {
        const match = DEV_PATTERN.every((c, i) => c === next[i]);
        if (match) {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
          onApprove();
          setClicks([]);
        } else {
          setClicks([corner]);
        }
      } else {
        const expected = DEV_PATTERN[next.length - 1];
        if (corner === expected) {
          setClicks(next);
        } else {
          setClicks(corner === DEV_PATTERN[0] ? [corner] : []);
        }
      }
    },
    [clicks, onApprove]
  );

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-yellow-400 via-orange-400 to-rose-500 flex items-center justify-center">
      <button
        className="absolute top-0 left-0 w-16 h-16 opacity-0 cursor-default"
        onClick={() => handleCornerClick('tl')}
        aria-hidden="true"
      />
      <button
        className="absolute top-0 right-0 w-16 h-16 opacity-0 cursor-default"
        onClick={() => handleCornerClick('tr')}
        aria-hidden="true"
      />
      <button
        className="absolute bottom-0 left-0 w-16 h-16 opacity-0 cursor-default"
        onClick={() => handleCornerClick('bl')}
        aria-hidden="true"
      />
      <button
        className="absolute bottom-0 right-0 w-16 h-16 opacity-0 cursor-default"
        onClick={() => handleCornerClick('br')}
        aria-hidden="true"
      />

      <div className="text-center px-6 max-w-lg animate-pulse">
        <Trophy size={80} className="mx-auto text-white mb-6 drop-shadow-lg" />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-md leading-tight">
          Керемет!
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-white/95 leading-relaxed drop-shadow">
          Енді Нұраділ ағаңа барып, {BOSS_REWARD.tenge} ₸ сыйлығыңды ал!
        </p>
        <div className="mt-8 text-6xl">🎉🏆💰</div>
      </div>
    </div>
  );
}
