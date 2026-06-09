export function levelToProblem(level) {
  switch (level.type) {
    case 'sudoku':
      return {
        emojis: level.emojis,
        initial: level.initial,
        solution: level.solution,
      };
    case 'chess':
      return {
        piece: level.piece,
        pieceSymbol: level.pieceSymbol,
        pieceLabel: level.pieceLabel,
        start: level.start,
        target: level.target,
        obstacles: level.obstacles || [],
        minMoves: level.minMoves || 1,
        dangerZones: level.dangerZones || [],
      };
    case 'pattern':
      if (level.rounds?.length) return level.rounds[0];
      return {
        sequence: level.sequence,
        choices: level.choices,
        answer: level.answer,
      };
    case 'maze':
      return {
        grid: level.grid,
        start: level.start,
        end: level.end,
        solution: level.solution,
      };
    case 'memory':
    case 'spatial':
    case 'reasoning':
    case 'deduce':
      return level;
    default:
      if (level.type?.startsWith('math-')) {
        return (level.problems || [])[0] || level;
      }
      return level;
  }
}
