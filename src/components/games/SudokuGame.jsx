import { useState, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { checkPartialGrid, isValidSolution, cellHasConflict } from '../../utils/sudoku';

export default function SudokuGame({ problem, onProblemComplete, onStruggle }) {
  const [grid, setGrid] = useState(() =>
    problem.initial.map((row) => row.map((cell) => cell))
  );
  const [errors, setErrors] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [wrongFull, setWrongFull] = useState(false);

  const isFixed = useCallback(
    (r, c) => problem.initial[r][c] !== null,
    [problem.initial]
  );

  const handleSolved = () => {
    setSolved(true);
    setWrongFull(false);
    setTimeout(onProblemComplete, 500);
  };

  const tryComplete = (next) => {
    const isFull = next.every((row) => row.every(Boolean));
    if (!isFull) return;
    if (isValidSolution(next, problem.initial, problem.emojis)) {
      handleSolved();
    } else {
      setWrongFull(true);
      onStruggle?.();
    }
  };

  const updateCell = (r, c, emoji) => {
    if (isFixed(r, c) || solved) return;
    const next = grid.map((row) => [...row]);
    next[r][c] = emoji;
    setGrid(next);
    setWrongFull(false);

    if (!checkPartialGrid(next)) {
      setErrors(new Set([`${r},${c}`]));
      onStruggle?.();
    } else {
      setErrors(new Set());
      tryComplete(next);
    }
  };

  const checkSolution = () => {
    const isFull = grid.every((row) => row.every(Boolean));
    if (!isFull) return;
    if (!checkPartialGrid(grid)) {
      setWrongFull(true);
      onStruggle?.();
      return;
    }
    tryComplete(grid);
  };

  const getCellError = (r, c) => {
    if (errors.has(`${r},${c}`)) return true;
    return cellHasConflict(grid, r, c);
  };

  const isFull = grid.every((row) => row.every(Boolean));

  return (
    <div className="space-y-4">
      {solved && (
        <div className="flex items-center justify-center gap-2 bg-green-100 border-2 border-green-400 rounded-2xl p-3 animate-fade-in">
          <CheckCircle2 className="text-green-600" size={28} />
          <p className="text-green-700 font-extrabold text-lg">Дұрыс! Судоку шешілді!</p>
        </div>
      )}

      {wrongFull && !solved && (
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-3 text-center animate-fade-in">
          <p className="text-red-600 font-extrabold">Қате шешім!</p>
          <p className="text-red-500 text-sm font-semibold mt-1">Жол, баған және 2×2 шаршыны қайта тексер</p>
        </div>
      )}

      <div className="flex justify-center">
        <div className={`inline-grid grid-cols-4 gap-0.5 p-2 rounded-xl transition-all ${
          solved ? 'bg-green-300 ring-4 ring-green-400' : 'bg-violet-300'
        }`}>
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => setSelected({ r, c })}
                disabled={isFixed(r, c) || solved}
                className={`
                  w-[4.5rem] h-[4.5rem] text-2xl rounded-md flex items-center justify-center transition-all active:scale-95
                  ${c === 1 ? 'ml-1' : ''}
                  ${r === 1 ? 'mt-1' : ''}
                  ${c === 3 ? 'mr-1' : ''}
                  ${r === 3 ? 'mb-1' : ''}
                  ${isFixed(r, c) ? 'bg-violet-100 font-bold' : solved ? 'bg-green-50 font-bold' : 'bg-white active:bg-violet-50'}
                  ${getCellError(r, c) ? 'ring-2 ring-red-500 bg-red-50' : ''}
                  ${selected?.r === r && selected?.c === c && !solved ? 'ring-2 ring-violet-500' : ''}
                `}
              >
                {cell || ''}
              </button>
            ))
          )}
        </div>
      </div>

      {!solved && (
        <p className="text-center text-xs text-violet-600 font-semibold px-2">
          4×4 судоку: әр жол, әр баған және әр 2×2 шаршыда 🍎🍌🍇🍊 бір рет. Диагональ тексерілмейді.
        </p>
      )}

      {selected && !isFixed(selected.r, selected.c) && !solved && (
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

      {isFull && !solved && (
        <button
          onClick={checkSolution}
          className="w-full touch-target py-3.5 bg-green-500 text-white font-extrabold text-lg rounded-2xl shadow-lg active:bg-green-600"
        >
          ✓ Тексеру
        </button>
      )}

      {!isFull && !solved && (
        <p className="text-center text-xs text-gray-400 font-semibold">
          Барлық ұяшықты толтыр, содан кейін «Тексеру» басы
        </p>
      )}
    </div>
  );
}
