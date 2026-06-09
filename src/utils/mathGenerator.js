import { shuffleArray } from '../data/curriculum';

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueKey(p) {
  return JSON.stringify(p);
}

export function generateMathProblems(type, difficulty, count, seedProblems = []) {
  const seen = new Set(seedProblems.map(uniqueKey));
  const result = [...seedProblems];
  let attempts = 0;

  const ranges = {
    easy: { max: 12, min: 1 },
    medium: { max: 18, min: 2 },
    hard: { max: 20, min: 3 },
  };
  const r = ranges[difficulty] || ranges.medium;

  while (result.length < count && attempts < 500) {
    attempts++;
    let p = null;

    if (type === 'math-add') {
      const a = rand(r.min, r.max);
      const b = rand(r.min, Math.min(r.max, 20 - a));
      p = { a, b, op: '+', answer: a + b };
    } else if (type === 'math-sub') {
      const a = rand(r.min + 3, r.max + 5);
      const b = rand(r.min, a - 1);
      p = { a, b, op: '-', answer: a - b };
    } else if (type === 'math-mixed') {
      const add = Math.random() > 0.5;
      if (add) {
        const a = rand(r.min, r.max);
        const b = rand(r.min, Math.min(r.max, 20 - a));
        p = { a, b, op: '+', answer: a + b };
      } else {
        const a = rand(r.min + 4, r.max + 5);
        const b = rand(r.min, a - 1);
        p = { a, b, op: '-', answer: a - b };
      }
    } else if (type === 'math-sign') {
      const useAdd = Math.random() > 0.5;
      const a = rand(r.min, r.max);
      const b = rand(r.min, r.max);
      if (useAdd && a + b <= 24) {
        p = { a, b, result: a + b, answer: '+' };
      } else if (a > b) {
        p = { a, b, result: a - b, answer: '-' };
      } else if (b > a) {
        p = { a: b, b: a, result: b - a, answer: '-' };
      }
    } else if (type === 'math-double') {
      const base = rand(difficulty === 'easy' ? 2 : 4, difficulty === 'hard' ? 12 : 9);
      p = { base, answer: base * 2 };
    } else if (type === 'math-half') {
      const ans = rand(difficulty === 'easy' ? 2 : 3, difficulty === 'hard' ? 12 : 8);
      p = { base: ans * 2, answer: ans };
    }

    if (p && !seen.has(uniqueKey(p))) {
      seen.add(uniqueKey(p));
      result.push(p);
    }
  }

  return shuffleArray(result).slice(0, count);
}
