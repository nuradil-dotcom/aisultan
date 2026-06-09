const DIR_MAP = {
  'Жоғары': { dr: -1, dc: 0 },
  'Төмен': { dr: 1, dc: 0 },
  'Оңға': { dr: 0, dc: 1 },
  'Солға': { dr: 0, dc: -1 },
};

export function simulateMaze(grid, start, commands) {
  let row = start.row;
  let col = start.col;
  const path = [{ row, col }];

  for (const cmd of commands) {
    const delta = DIR_MAP[cmd];
    if (!delta) return { success: false, path, final: { row, col } };
    const nr = row + delta.dr;
    const nc = col + delta.dc;
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) {
      return { success: false, path, final: { row, col }, hitWall: true };
    }
    if (grid[nr][nc] === '#') {
      return { success: false, path, final: { row, col }, hitWall: true };
    }
    row = nr;
    col = nc;
    path.push({ row, col });
  }
  return { success: true, path, final: { row, col } };
}

export function checkMazeSolution(grid, start, end, commands, solution) {
  const result = simulateMaze(grid, start, commands);
  if (!result.success) return false;
  if (result.final.row !== end.row || result.final.col !== end.col) return false;
  if (solution) {
    return commands.join('|') === solution.join('|');
  }
  return true;
}
