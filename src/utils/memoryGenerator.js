import { shuffleArray } from '../data/curriculum';

const POOLS = {
  easy: ['🔴', '🔵', '🟢', '🟡', '⭐', '🌙', '🐱', '🐶'],
  medium: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '🅰️', '🅱️'],
  hard: ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '🐱', '🐶', '🐰'],
};

const LENGTHS = { easy: [3, 4], medium: [4, 5], hard: [5, 6, 7] };

function problemKey(p) {
  return `${p.kind}|${p.sequence.join('')}|${p.answer}`;
}

function randLen(difficulty) {
  const range = LENGTHS[difficulty] || LENGTHS.medium;
  return range[Math.floor(Math.random() * range.length)];
}

export function generateMemoryProblem(difficulty, seen = new Set()) {
  const pool = POOLS[difficulty] || POOLS.medium;

  for (let i = 0; i < 50; i++) {
    const kind = Math.random() > 0.4 ? 'next' : 'missing';
    const len = randLen(difficulty);
    const seq = shuffleArray([...pool]).slice(0, len);

    let problem;
    if (kind === 'next') {
      const show = seq.slice(0, -1);
      const answer = seq[seq.length - 1];
      const decoys = shuffleArray(pool.filter((x) => x !== answer && !show.includes(x))).slice(0, 5);
      const choices = shuffleArray([answer, ...decoys]);
      problem = { kind: 'next', sequence: show, choices, answer, displayMs: difficulty === 'hard' ? 1600 : 2200 };
    } else {
      const missIdx = Math.floor(Math.random() * seq.length);
      const answer = seq[missIdx];
      const display = seq.map((x, idx) => (idx === missIdx ? '❓' : x));
      const decoys = shuffleArray(pool.filter((x) => x !== answer && !seq.includes(x))).slice(0, 5);
      const choices = shuffleArray([answer, ...decoys]);
      problem = { kind: 'missing', sequence: display, fullSequence: seq, choices, answer, displayMs: 2800 };
    }

    const key = problemKey(problem);
    if (!seen.has(key)) {
      seen.add(key);
      return problem;
    }
  }
  return null;
}

export function generateMemoryBatch(difficulty, count, seeds = []) {
  const seen = new Set(seeds.map(problemKey));
  const result = [...seeds];
  while (result.length < count) {
    const p = generateMemoryProblem(difficulty, seen);
    if (p) result.push(p);
    else break;
  }
  return shuffleArray(result).slice(0, count);
}
