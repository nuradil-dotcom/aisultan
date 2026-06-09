import { BOARD_SIZE, getValidMoves } from './chess';

const PIECES = {
  easy: [
    { piece: 'rook', pieceSymbol: '♜', pieceLabel: 'Тұра тас' },
    { piece: 'bishop', pieceSymbol: '♝', pieceLabel: 'Піл' },
  ],
  medium: [
    { piece: 'rook', pieceSymbol: '♜', pieceLabel: 'Тұра тас' },
    { piece: 'bishop', pieceSymbol: '♝', pieceLabel: 'Піл' },
    { piece: 'knight', pieceSymbol: '♞', pieceLabel: 'Ат' },
  ],
  hard: [
    { piece: 'queen', pieceSymbol: '♛', pieceLabel: 'Уәзір' },
    { piece: 'knight', pieceSymbol: '♞', pieceLabel: 'Ат' },
    { piece: 'king', pieceSymbol: '♚', pieceLabel: 'Патша' },
  ],
};

const MIN_MOVES = { easy: 1, medium: 2, hard: 2 };
const OBSTACLE_COUNT = { easy: 0, medium: 1, hard: 2 };

function posKey(p) {
  const dz = (p.dangerZones || []).map((d) => `${d.row},${d.col}`).join(';');
  return `${p.piece}|${p.start.row},${p.start.col}|${p.target.row},${p.target.col}|${p.obstacles.map((o) => `${o.row},${o.col}`).join(';')}|${dz}`;
}

function randomPos() {
  return { row: Math.floor(Math.random() * BOARD_SIZE), col: Math.floor(Math.random() * BOARD_SIZE) };
}

function bfsPath(piece, start, target, obstacles, maxDepth, minMoves, dangerZones = []) {
  const queue = [{ pos: start, steps: 0 }];
  const visited = new Set([`${start.row},${start.col}`]);

  while (queue.length) {
    const { pos, steps } = queue.shift();
    if (steps > maxDepth) continue;
    if (pos.row === target.row && pos.col === target.col && steps >= minMoves) {
      return steps;
    }

    for (const m of getValidMoves(piece, pos, obstacles, dangerZones)) {
      const key = `${m.row},${m.col}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ pos: m, steps: steps + 1 });
    }
  }
  return null;
}

function generateKingPuzzle(difficulty, seen) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const start = randomPos();
    const dangerZones = [];
    for (let i = 0; i < (difficulty === 'hard' ? 4 : 3); i++) {
      const d = randomPos();
      if (`${d.row},${d.col}` !== `${start.row},${start.col}`) dangerZones.push(d);
    }
    let target = randomPos();
    let guard = 0;
    const dangerSet = new Set(dangerZones.map((d) => `${d.row},${d.col}`));
    while ((target.row === start.row && target.col === start.col) || dangerSet.has(`${target.row},${target.col}`)) {
      target = randomPos();
      if (++guard > 30) break;
    }

    const pathLen = bfsPath('king', start, target, [], 4, 1, dangerZones);
    if (pathLen === null) continue;

    const puzzle = {
      piece: 'king',
      pieceSymbol: '♚',
      pieceLabel: 'Патша',
      start,
      target,
      obstacles: [],
      dangerZones,
      minMoves: 1,
    };
    const key = posKey(puzzle);
    if (!seen.has(key)) {
      seen.add(key);
      return puzzle;
    }
  }
  return null;
}

export function generateChessPuzzle(difficulty, seen = new Set()) {
  if (difficulty === 'hard' && Math.random() > 0.55) {
    return generateKingPuzzle(difficulty, seen);
  }

  const pieces = PIECES[difficulty] || PIECES.medium;
  const minMoves = MIN_MOVES[difficulty] || 2;
  const obsCount = OBSTACLE_COUNT[difficulty] || 1;
  const maxDepth = difficulty === 'hard' ? 6 : difficulty === 'medium' ? 5 : 4;

  for (let attempt = 0; attempt < 60; attempt++) {
    const meta = pieces[Math.floor(Math.random() * pieces.length)];
    if (meta.piece === 'king') continue;

    const start = randomPos();
    let target = randomPos();
    let guard = 0;
    while ((target.row === start.row && target.col === start.col) && guard++ < 20) {
      target = randomPos();
    }

    const obstacles = [];
    for (let i = 0; i < obsCount; i++) {
      const o = randomPos();
      if ((o.row === start.row && o.col === start.col) || (o.row === target.row && o.col === target.col)) continue;
      if (!obstacles.some((x) => x.row === o.row && x.col === o.col)) obstacles.push(o);
    }

    const pathLen = bfsPath(meta.piece, start, target, obstacles, maxDepth, minMoves);
    if (pathLen === null || pathLen < minMoves) continue;

    const puzzle = { ...meta, start, target, obstacles, minMoves };
    const key = posKey(puzzle);
    if (!seen.has(key)) {
      seen.add(key);
      return puzzle;
    }
  }
  return null;
}

export function generateChessBatch(difficulty, count, seed = null) {
  const seen = new Set();
  const result = seed ? [seed] : [];
  if (seed) seen.add(posKey(seed));

  let attempts = 0;
  while (result.length < count && attempts < count * 25) {
    attempts++;
    const p = generateChessPuzzle(difficulty, seen);
    if (p) result.push(p);
  }
  return result.slice(0, count);
}
