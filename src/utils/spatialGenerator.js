import { shuffleArray } from '../data/curriculum';

// Asymmetric 3x3 shapes only — rotation must change appearance
const SHAPES = [
  ['⬜', '⬜', '⬛'],
  ['⬛', '⬜', '⬜'],
  ['⬜', '⬛', '⬜'],
  ['🔺', '⬜', '⬜'],
  ['⬜', '🔺', '🔺'],
  ['🔴', '🔴', '⬜'],
  ['⬜', '🔵', '🔵'],
  ['⬛', '⬜', '🔺'],
  ['🔺', '⬛', '⬜'],
  ['⭐', '⬜', '⬛'],
  ['⬛', '⭐', '⬜'],
  ['🔴', '⬜', '🔵'],
];

function rotateGrid(grid) {
  const n = 3;
  const result = [];
  for (let c = 0; c < n; c++) {
    for (let r = n - 1; r >= 0; r--) {
      result.push(grid[r * n + c]);
    }
  }
  return result;
}

function mirrorGrid(grid) {
  const n = 3;
  return grid.map((_, i) => {
    const r = Math.floor(i / n);
    const c = i % n;
    return grid[r * n + (n - 1 - c)];
  });
}

function gridStr(g) {
  return g.join('');
}

function uniqueOptions(options) {
  const strs = options.map(gridStr);
  return new Set(strs).size === strs.length;
}

export function generateSpatialProblem(difficulty, seen = new Set()) {
  for (let i = 0; i < 60; i++) {
    const base = [...SHAPES[Math.floor(Math.random() * SHAPES.length)]];
    const transforms = difficulty === 'easy'
      ? [rotateGrid, (g) => rotateGrid(rotateGrid(g))]
      : difficulty === 'medium'
        ? [rotateGrid, mirrorGrid, (g) => rotateGrid(mirrorGrid(g))]
        : [rotateGrid, mirrorGrid, (g) => rotateGrid(rotateGrid(rotateGrid(g))), (g) => mirrorGrid(rotateGrid(g))];

    const transform = transforms[Math.floor(Math.random() * transforms.length)];
    const correct = transform(base);

    if (gridStr(correct) === gridStr(base)) continue;

    const wrongPool = SHAPES.filter((s) => {
      const sStr = gridStr(s);
      return sStr !== gridStr(correct) && sStr !== gridStr(base);
    });
    const wrongs = shuffleArray(wrongPool).slice(0, 3).map((s) => {
      const t = Math.random() > 0.4 ? rotateGrid(s) : mirrorGrid(s);
      return t;
    });

    while (wrongs.length < 3) {
      const s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      wrongs.push(rotateGrid(s));
    }

    const options = shuffleArray([correct, ...wrongs.slice(0, 3)]);
    if (!uniqueOptions(options)) continue;

    const answerIdx = options.findIndex((o) => gridStr(o) === gridStr(correct));
    if (answerIdx < 0) continue;

    const problem = {
      prompt: difficulty === 'easy' ? 'Бұрылғанын тап!' : 'Дұрыс түрленгенін тап!',
      grid: base,
      options,
      answer: answerIdx,
    };

    const fp = `${gridStr(base)}|${options.map(gridStr).join(',')}`;
    if (!seen.has(fp)) {
      seen.add(fp);
      return problem;
    }
  }
  return null;
}

export function generateSpatialBatch(difficulty, count, seed = null) {
  const seen = new Set();
  const result = seed ? [seed] : [];
  if (seed) seen.add(`${gridStr(seed.grid)}|${seed.options.map(gridStr).join(',')}`);

  let attempts = 0;
  while (result.length < count && attempts < count * 40) {
    attempts++;
    const p = generateSpatialProblem(difficulty, seen);
    if (p) result.push(p);
  }
  return result.slice(0, count);
}
