import { shuffleArray } from '../data/curriculum';
import { simulateMaze } from './maze';

const SIZES = { easy: 4, medium: 5, hard: 6 };

const DIRS = [
  { label: 'Жоғары', dr: -1, dc: 0 },
  { label: 'Төмен', dr: 1, dc: 0 },
  { label: 'Оңға', dr: 0, dc: 1 },
  { label: 'Солға', dr: 0, dc: -1 },
];

function carveMaze(size) {
  const grid = Array.from({ length: size }, () => Array(size).fill('#'));
  const visited = Array.from({ length: size }, () => Array(size).fill(false));

  function neighbors(r, c) {
    return shuffleArray(DIRS.map((d) => ({ ...d, r: r + d.dr, c: c + d.dc })))
      .filter(({ r, c }) => r >= 0 && r < size && c >= 0 && c < size && !visited[r][c]);
  }

  function dfs(r, c) {
    visited[r][c] = true;
    grid[r][c] = '.';
    for (const { r: nr, c: nc, dr, dc } of neighbors(r, c)) {
      const wr = r + dr;
      const wc = c + dc;
      if (wr >= 0 && wr < size && wc >= 0 && wc < size && grid[wr][wc] === '#') {
        grid[wr][wc] = '.';
        dfs(nr, nc);
      }
    }
  }

  dfs(0, 0);
  grid[0][0] = 'S';
  grid[size - 1][size - 1] = 'E';
  return grid;
}

function solveMaze(grid, start) {
  const size = grid.length;
  const end = { row: size - 1, col: size - 1 };
  const queue = [{ pos: start, path: [] }];
  const seen = new Set([`${start.row},${start.col}`]);

  while (queue.length) {
    const { pos, path } = queue.shift();
    if (pos.row === end.row && pos.col === end.col) return path;

    for (const d of DIRS) {
      const nr = pos.row + d.dr;
      const nc = pos.col + d.dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      if (seen.has(key)) continue;
      const cell = grid[nr][nc];
      if (cell === '#') continue;
      seen.add(key);
      queue.push({ pos: { row: nr, col: nc }, path: [...path, d.label] });
    }
  }
  return null;
}

function mazeKey(grid) {
  return grid.map((r) => r.join('')).join('|');
}

export function generateMaze(difficulty, seen = new Set()) {
  const size = SIZES[difficulty] || 5;

  for (let i = 0; i < 30; i++) {
    const grid = carveMaze(size);
    const start = { row: 0, col: 0 };
    const solution = solveMaze(grid, start);
    if (!solution || solution.length < 3) continue;

    const key = mazeKey(grid);
    if (seen.has(key)) continue;
    seen.add(key);

    return {
      grid,
      start,
      end: { row: size - 1, col: size - 1 },
      solution,
    };
  }
  return null;
}

export function generateMazeBatch(difficulty, count, seed = null) {
  const seen = new Set();
  const result = seed ? [seed] : [];
  if (seed) seen.add(mazeKey(seed.grid));

  let attempts = 0;
  while (result.length < count && attempts < count * 20) {
    attempts++;
    const p = generateMaze(difficulty, seen);
    if (p) {
      const sim = simulateMaze(p.grid, p.start, p.solution);
      if (sim.final.row === p.end.row && sim.final.col === p.end.col) {
        result.push(p);
      }
    }
  }
  return result.slice(0, count);
}
