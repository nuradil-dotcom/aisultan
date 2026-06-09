const BOARD_SIZE = 8;

function blockedSet(obstacles = []) {
  return new Set(obstacles.map((o) => `${o.row},${o.col}`));
}

function slideMoves(start, directions, blocked) {
  const moves = [];
  for (const { dr, dc } of directions) {
    let r = start.row + dr;
    let c = start.col + dc;
    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      const key = `${r},${c}`;
      if (blocked.has(key)) break;
      moves.push({ row: r, col: c });
      r += dr;
      c += dc;
    }
  }
  return moves;
}

export function getRookMoves(start, obstacles = []) {
  const blocked = blockedSet(obstacles);
  return slideMoves(start, [
    { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
  ], blocked);
}

export function getBishopMoves(start, obstacles = []) {
  const blocked = blockedSet(obstacles);
  return slideMoves(start, [
    { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
  ], blocked);
}

export function getQueenMoves(start, obstacles = []) {
  const blocked = blockedSet(obstacles);
  return slideMoves(start, [
    { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, { dr: 0, dc: -1 }, { dr: 0, dc: 1 },
    { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, { dr: 1, dc: -1 }, { dr: 1, dc: 1 },
  ], blocked);
}

export function getKnightMoves(start, obstacles = []) {
  const blocked = blockedSet(obstacles);
  const moves = [];
  const offsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ];
  for (const [dr, dc] of offsets) {
    const r = start.row + dr;
    const c = start.col + dc;
    if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && !blocked.has(`${r},${c}`)) {
      moves.push({ row: r, col: c });
    }
  }
  return moves;
}

export function getKingMoves(start, obstacles = [], dangerZones = []) {
  const blocked = blockedSet(obstacles);
  const danger = new Set(dangerZones.map((d) => `${d.row},${d.col}`));
  const moves = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = start.row + dr;
      const c = start.col + dc;
      const key = `${r},${c}`;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && !blocked.has(key) && !danger.has(key)) {
        moves.push({ row: r, col: c });
      }
    }
  }
  return moves;
}

export function getValidMoves(piece, start, obstacles = [], dangerZones = []) {
  switch (piece) {
    case 'rook': return getRookMoves(start, obstacles);
    case 'bishop': return getBishopMoves(start, obstacles);
    case 'queen': return getQueenMoves(start, obstacles);
    case 'knight': return getKnightMoves(start, obstacles);
    case 'king': return getKingMoves(start, obstacles, dangerZones);
    default: return [];
  }
}

export function canReachTarget(piece, start, target, obstacles = [], dangerZones = []) {
  const moves = getValidMoves(piece, start, obstacles, dangerZones);
  return moves.some((m) => m.row === target.row && m.col === target.col);
}

export { BOARD_SIZE };
