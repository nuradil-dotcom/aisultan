import { useState, useCallback } from 'react';

function hasRepeatInLine(cells) {
  const filled = cells.filter(Boolean);
  return filled.length !== new Set(filled).size;
}

function checkGrid(grid) {
  const size = grid.length;
  for (let r = 0; r < size; r++) {
    if (hasRepeatInLine(grid[r])) return false;
  }
  for (let c = 0; c < size; c++) {
    const col = grid.map((row) => row[c]);
    if (hasRepeatInLine(col)) return false;
  }
  return true;
}

function gridsEqual(a, b) {
  return a.every((row, r) => row.every((cell, c) => cell === b[r][c]));
}

export default function SudokuGame({ problem, onProblemComplete, onStruggle }) {
  const [grid, setGrid] = useState(() =>
    problem.initial.map((row) => row.map((cell) => cell))
  );
  const [errors, setErrors] = useState(new Set());
  const [selected, setSelected] = useState(null);

  const isFixed = useCallback(
    (r, c) => problem.initial[r][c] !== null,
    [problem.initial]
  );

  const updateCell = (r, c, emoji) => {
    if (isFixed(r, c)) return;
    const next = grid.map((row) => [...row]);
    next[r][c] = emoji;
    setGrid(next);

    if (!checkGrid(next)) {
      setErrors(new Set([`${r},${c}`]));
      onStruggle?.();
    } else {
      setErrors(new Set());
      if (next.every((row) => row.every(Boolean)) && gridsEqual(next, problem.solution)) {
        onProblemComplete();
      }
    }
  };

  const getCellError = (r, c) => {
    if (errors.has(`${r},${c}`)) return true;
    const row = grid[r];
    const col = grid.map((row) => row[c]);
    if (grid[r][c] && hasRepeatInLine(row)) return true;
    if (grid[r][c] && hasRepeatInLine(col)) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-1 bg-violet-300 p-2 rounded-xl">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => setSelected({ r, c })}
                disabled={isFixed(r, c)}
                className={`
                  w-[4.5rem] h-[4.5rem] text-2xl rounded-lg flex items-center justify-center transition-all active:scale-95
                  ${isFixed(r, c) ? 'bg-violet-100 font-bold' : 'bg-white active:bg-violet-50'}
                  ${getCellError(r, c) ? 'ring-2 ring-red-500 bg-red-50' : ''}
                  ${selected?.r === r && selected?.c === c ? 'ring-2 ring-violet-500' : ''}
                `}
              >
                {cell || ''}
              </button>
            ))
          )}
        </div>
      </div>

      {selected && !isFixed(selected.r, selected.c) && (
        <div className="flex justify-center gap-2 flex-wrap">
          {problem.emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => updateCell(selected.r, selected.c, emoji)}
              className="touch-target w-12 h-12 text-2xl bg-white rounded-xl shadow active:scale-95 transition-transform border-2 border-violet-200"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => updateCell(selected.r, selected.c, null)}
            className="px-3 h-12 text-sm font-bold text-gray-500 bg-gray-100 rounded-xl"
          >
            Өшіру
          </button>
        </div>
      )}
    </div>
  );
}
