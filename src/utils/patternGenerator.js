import { shuffleArray } from '../data/curriculum';

// Only true repeating cycles — no fake arithmetic templates
const EASY_TEMPLATES = [
  { unit: ['🔴', '🔵'], len: 5 },
  { unit: ['🟡', '🟢'], len: 5 },
  { unit: ['⭕', '⬜'], len: 5 },
  { unit: ['🐱', '🐶'], len: 5 },
  { unit: ['⭐', '🌙'], len: 5 },
  { unit: ['1️⃣', '2️⃣'], len: 5 },
  { unit: ['🅰️', '🅱️'], len: 5 },
];

const MEDIUM_TEMPLATES = [
  { unit: ['1️⃣', '2️⃣', '3️⃣'], len: 5 },
  { unit: ['🔴', '🟡', '🔵'], len: 5 },
  { unit: ['⭕', '⭕', '⬜', '⬜'], len: 6 },
  { unit: ['🅰️', '🅱️', '🅲'], len: 5 },
  { unit: ['🌸', '🌻', '🌹'], len: 5 },
  { unit: ['🔺', '🔺', '⭐', '⭐'], len: 6 },
];

const HARD_TEMPLATES = [
  { unit: ['⭐', '⭐⭐', '⭐⭐⭐'], len: 6 },
  { unit: ['🔴', '🟡', '🔵', '🔴'], len: 6 },
  { unit: ['3️⃣', '3️⃣', '6️⃣', '6️⃣'], len: 6 },
  { unit: ['⬜', '🔺', '⬜', '🔺'], len: 6 },
  { unit: ['🅰️', '🅱️', '🅲', '🅳️'], len: 6 },
  { unit: ['2️⃣', '2️⃣', '4️⃣', '4️⃣'], len: 6 },
];

const DISTRACTORS = ['🔺', '⭕', '🟢', '🟣', '4️⃣', '5️⃣', '☀️', '🌟', '🔶', '⬛'];

function buildFromTemplate({ unit, len }) {
  const sequence = [];
  for (let i = 0; i < len; i++) sequence.push(unit[i % unit.length]);
  const answer = unit[len % unit.length];
  const pool = shuffleArray([...new Set([...unit, ...DISTRACTORS])]);
  const choices = shuffleArray([answer, ...pool.filter((x) => x !== answer).slice(0, 3)]);
  return { sequence, choices, answer };
}

function patternKey(p) {
  return `${p.sequence.join('')}|${p.answer}`;
}

export function generatePattern(difficulty, seen = new Set()) {
  const templates = difficulty === 'hard' ? HARD_TEMPLATES
    : difficulty === 'medium' ? MEDIUM_TEMPLATES
      : EASY_TEMPLATES;

  for (let i = 0; i < 60; i++) {
    const t = templates[Math.floor(Math.random() * templates.length)];
    const p = buildFromTemplate(t);
    const key = patternKey(p);
    if (!seen.has(key)) {
      seen.add(key);
      return p;
    }
  }
  return buildFromTemplate(shuffleArray(templates)[0]);
}

export function generatePatternBatch(difficulty, count, seeds = []) {
  const seen = new Set(seeds.map(patternKey));
  const result = [...seeds];
  while (result.length < count) {
    result.push(generatePattern(difficulty, seen));
  }
  return shuffleArray(result).slice(0, count);
}
