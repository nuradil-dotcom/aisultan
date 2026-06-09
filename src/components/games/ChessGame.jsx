import { useState, useMemo } from 'react';
import { BOARD_SIZE, getValidMoves } from '../../utils/chess';

const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function ChessGame({ problem, onProblemComplete, onStruggle }) {
  const [piecePos, setPiecePos] = useState(problem.start);
  const [moveCount, setMoveCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [tooEarly, setTooEarly] = useState(false);

  const dangerZones = problem.dangerZones || [];
  const isKing = problem.piece === 'king';

  const validMoves = useMemo(
    () => getValidMoves(problem.piece, piecePos, problem.obstacles, dangerZones),
    [problem.piece, piecePos, problem.obstacles, dangerZones]
  );
  const validSet = new Set(validMoves.map((m) => `${m.row},${m.col}`));
  const obstacleSet = new Set(problem.obstacles.map((o) => `${o.row},${o.col}`));
  const dangerSet = new Set(dangerZones.map((d) => `${d.row},${d.col}`));
  const targetKey = `${problem.target.row},${problem.target.col}`;
  const minMoves = problem.minMoves || 1;

  const handleSquareClick = (row, col) => {
    if (completed) return;
    const key = `${row},${col}`;
    if (!validSet.has(key)) return;

    const newCount = moveCount + 1;
    setPiecePos({ row, col });
    setMoveCount(newCount);

    if (key === targetKey && newCount >= minMoves) {
      setCompleted(true);
      onProblemComplete();
    } else if (key === targetKey && newCount < minMoves) {
      setTooEarly(true);
      onStruggle?.();
      setPiecePos(problem.start);
      setMoveCount(0);
      setTimeout(() => setTooEarly(false), 1500);
    }
  };

  const isLight = (r, c) => (r + c) % 2 === 0;

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">
        {isKing
          ? `${problem.pieceLabel} (${problem.pieceSymbol}) — ⚠️ қауіпсіз 🎯 жерге жет!`
          : `${problem.pieceLabel} (${problem.pieceSymbol}) — 🎯 мақсатқа қадамдап жет!`}
      </p>
      <div className="flex justify-center gap-4 text-sm font-bold text-violet-700">
        <span>Қадам: {moveCount}</span>
        {minMoves > 1 && <span>Кемінде: {minMoves} қадам</span>}
      </div>

      <div className="flex justify-center overflow-x-auto">
        <div className="inline-block">
          <div className="flex mb-1">
            <div className="w-6" />
            {COL_LABELS.map((l) => (
              <div key={l} className="w-11 text-center text-xs font-bold text-gray-500">{l}</div>
            ))}
          </div>
          {Array.from({ length: BOARD_SIZE }, (_, row) => (
            <div key={row} className="flex items-center">
              <div className="w-6 text-center text-xs font-bold text-gray-500">{BOARD_SIZE - row}</div>
              {Array.from({ length: BOARD_SIZE }, (_, col) => {
                const key = `${row},${col}`;
                const isPiece = piecePos.row === row && piecePos.col === col;
                const isTarget = key === targetKey;
                const isObstacle = obstacleSet.has(key);
                const isDanger = dangerSet.has(key);
                const isValid = validSet.has(key);

                let bg = isLight(row, col) ? 'bg-amber-100' : 'bg-amber-700';
                if (isDanger) bg = 'bg-red-300';
                if (isValid) bg = 'bg-green-200 hover:bg-green-300 cursor-pointer';
                if (isTarget) bg = isValid ? 'bg-yellow-300 ring-2 ring-yellow-500' : 'bg-yellow-200 ring-2 ring-yellow-500';
                if (isObstacle) bg = 'bg-gray-600';
                if (isPiece) bg = 'bg-blue-400 ring-2 ring-blue-600';

                return (
                  <button
                    key={col}
                    onClick={() => handleSquareClick(row, col)}
                    disabled={!isValid || completed}
                    className={`w-11 h-11 flex items-center justify-center text-xl transition-colors active:scale-95 ${bg}`}
                  >
                    {isPiece && problem.pieceSymbol}
                    {isTarget && !isPiece && '🎯'}
                    {isDanger && !isPiece && !isTarget && '⚠️'}
                    {isObstacle && '⬛'}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {tooEarly && (
        <p className="text-center text-amber-600 font-bold bg-amber-50 rounded-xl p-2">
          Тым ерте жеттің! Кемінде {minMoves} қадам керек — қайта ойла!
        </p>
      )}
      <p className="text-center text-sm text-gray-500">
        {isKing
          ? 'Патша бір қадам жүреді. Қызыл ⚠️ жерге барма!'
          : 'Жасыл ұяшықтарға жүр. 🎯 жеткенде жеңіс!'}
      </p>
    </div>
  );
}
