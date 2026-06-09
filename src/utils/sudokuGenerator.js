import { shuffleArray } from '../data/curriculum';

const BASE = [
  ['a', 'b', 'c', 'd'],
  ['c', 'd', 'a', 'b'],
  ['b', 'a', 'd', 'c'],
  ['d', 'c', 'b', 'a'],
];

const CLUES = { easy: 7, medium: 5, hard: 3 };

function permuteSolution(emojis) {
  const map = { a: emojis[0], b: emojis[1], c: emojis[2], d: emojis[3] };
  return BASE.map((row) => row.map((k) => map[k]));
}

function gridKey(grid) {
  return grid.map((r) => r.map((c) => c || '_').join('')).join('|');
}

export function generateSudoku(emojis, difficulty, seen = new Set()) {
  for (let attempt = 0; attempt < 80; attempt++) {
    const solution = permuteSolution(shuffleArray([...emojis]));
    const clueCount = CLUES[difficulty] || 5;
    const cells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) cells.push({ r, c });
    }
    const keep = shuffleArray(cells).slice(0, clueCount);
    const keepSet = new Set(keep.map(({ r, c }) => `${r},${c}`));

    const initial = solution.map((row, r) =>
      row.map((cell, c) => (keepSet.has(`${r},${c}`) ? cell : null))
    );

    const key = gridKey(initial);
    if (!seen.has(key)) {
      seen.add(key);
      return { emojis, initial, solution };
    }
  }
  return null;
}

export function generateSudokuBatch(emojis, difficulty, count, seed = null) {
  const seen = new Set();
  const result = seed ? [seed] : [];
  if (seed) seen.add(gridKey(seed.initial));

  let attempts = 0;
  while (result.length < count && attempts < count * 30) {
    attempts++;
    const p = generateSudoku(emojis, difficulty, seen);
    if (p) result.push(p);
  }
  return result.slice(0, count);
}
