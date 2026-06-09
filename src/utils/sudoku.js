export function hasRepeatInLine(cells) {
  const filled = cells.filter(Boolean);
  return filled.length !== new Set(filled).size;
}

function getBoxCells(grid, boxRow, boxCol) {
  const cells = [];
  for (let r = boxRow; r < boxRow + 2; r++) {
    for (let c = boxCol; c < boxCol + 2; c++) {
      cells.push(grid[r][c]);
    }
  }
  return cells;
}

function lineHasAllSymbols(cells, emojis) {
  if (cells.some((c) => !c)) return false;
  const set = new Set(cells);
  return set.size === emojis.length && emojis.every((e) => set.has(e));
}

export function checkPartialGrid(grid) {
  const size = grid.length;
  for (let r = 0; r < size; r++) {
    if (hasRepeatInLine(grid[r])) return false;
  }
  for (let c = 0; c < size; c++) {
    const col = grid.map((row) => row[c]);
    if (hasRepeatInLine(col)) return false;
  }
  for (let br = 0; br < size; br += 2) {
    for (let bc = 0; bc < size; bc += 2) {
      if (hasRepeatInLine(getBoxCells(grid, br, bc))) return false;
    }
  }
  return true;
}

export function isValidSolution(grid, initial, emojis) {
  const size = grid.length;
  if (!grid.every((row) => row.every(Boolean))) return false;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (initial[r][c] !== null && grid[r][c] !== initial[r][c]) return false;
    }
  }

  for (let r = 0; r < size; r++) {
    if (!lineHasAllSymbols(grid[r], emojis)) return false;
  }
  for (let c = 0; c < size; c++) {
    const col = grid.map((row) => row[c]);
    if (!lineHasAllSymbols(col, emojis)) return false;
  }
  for (let br = 0; br < size; br += 2) {
    for (let bc = 0; bc < size; bc += 2) {
      if (!lineHasAllSymbols(getBoxCells(grid, br, bc), emojis)) return false;
    }
  }
  return true;
}

export function cellHasConflict(grid, r, c) {
  if (!grid[r][c]) return false;
  const row = grid[r];
  const col = grid.map((row) => row[c]);
  if (hasRepeatInLine(row)) return true;
  if (hasRepeatInLine(col)) return true;
  const br = Math.floor(r / 2) * 2;
  const bc = Math.floor(c / 2) * 2;
  if (hasRepeatInLine(getBoxCells(grid, br, bc))) return true;
  return false;
}
