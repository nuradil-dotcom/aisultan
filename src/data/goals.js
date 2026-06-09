export const RANKS = [
  { minPoints: 0, title: 'Айсұлтан', emoji: '🌱', color: 'text-green-600' },
  { minPoints: 50, title: 'Білгіш балақай', emoji: '📖', color: 'text-blue-600' },
  { minPoints: 150, title: 'Зерек зияткер', emoji: '🧠', color: 'text-violet-600' },
  { minPoints: 300, title: 'Логика шебері', emoji: '♟️', color: 'text-purple-600' },
  { minPoints: 500, title: 'Ақылды батыр', emoji: '⚔️', color: 'text-amber-600' },
  { minPoints: 800, title: 'Айсұлтан', emoji: '👑', color: 'text-rose-600' },
];

export function getRank(points) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (points >= r.minPoints) rank = r;
  }
  return rank;
}
