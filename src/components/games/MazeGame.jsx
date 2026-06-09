import { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Trash2, CheckCircle2 } from 'lucide-react';
import { simulateMaze } from '../../utils/maze';

const ARROWS = [
  { label: 'Жоғары', icon: ArrowUp },
  { label: 'Төмен', icon: ArrowDown },
  { label: 'Оңға', icon: ArrowRight },
  { label: 'Солға', icon: ArrowLeft },
];

export default function MazeGame({ problem, onProblemComplete, onStruggle }) {
  const [commands, setCommands] = useState([]);
  const [path, setPath] = useState([]);
  const [result, setResult] = useState(null);

  const addCommand = (cmd) => setCommands((prev) => [...prev, cmd]);
  const clearCommands = () => {
    setCommands([]);
    setPath([]);
    setResult(null);
  };

  const runCommands = () => {
    const sim = simulateMaze(problem.grid, problem.start, commands);
    setPath(sim.path);
    if (sim.final.row === problem.end.row && sim.final.col === problem.end.col) {
      setResult('success');
      setTimeout(onProblemComplete, 600);
    } else {
      setResult(sim.hitWall ? 'wall' : 'miss');
      onStruggle?.();
    }
  };

  const pathSet = new Set(path.map((p) => `${p.row},${p.col}`));

  return (
    <div className="space-y-6">
      {result === 'success' && (
        <div className="flex items-center justify-center gap-2 bg-green-100 border-2 border-green-400 rounded-2xl p-3 animate-fade-in">
          <CheckCircle2 className="text-green-600" size={28} />
          <p className="text-green-700 font-extrabold text-lg">Дұрыс! Финишке жеттің!</p>
        </div>
      )}
      <div className="flex justify-center">
        <div className="inline-grid gap-0.5 bg-sky-200 p-2 rounded-xl">
          {problem.grid.map((row, r) =>
            row.map((cell, c) => {
              const isStart = r === problem.start.row && c === problem.start.col;
              const isEnd = r === problem.end.row && c === problem.end.col;
              const isPath = pathSet.has(`${r},${c}`);
              let bg = 'bg-white';
              if (cell === '#') bg = 'bg-gray-700';
              if (isStart) bg = 'bg-green-300';
              if (isEnd) bg = 'bg-yellow-300';
              if (isPath && cell !== '#') bg = 'bg-sky-300';

              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-9 h-9 flex items-center justify-center text-base font-bold rounded ${bg}`}
                >
                  {isStart ? '🤖' : isEnd ? '🏁' : cell === '#' ? '' : ''}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {ARROWS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => addCommand(label)}
            className="touch-target flex items-center gap-1 px-3 py-2.5 bg-white rounded-xl border-2 border-sky-300 active:bg-sky-50 font-semibold text-sm"
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <p className="text-sm font-bold text-gray-600 mb-2">Бағыттар:</p>
        <div className="flex flex-wrap gap-1 min-h-[40px] bg-gray-50 rounded-xl p-3 border border-gray-200">
          {commands.length === 0 ? (
            <span className="text-gray-400 text-sm">Бағыт қос...</span>
          ) : (
            commands.map((cmd, i) => (
              <span
                key={i}
                className="bg-sky-100 text-sky-800 px-2 py-1 rounded-lg text-xs font-bold"
              >
                {cmd}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={runCommands}
          disabled={commands.length === 0}
          className="touch-target flex items-center gap-2 px-6 py-3.5 bg-green-500 text-white font-bold rounded-2xl active:bg-green-600 disabled:opacity-50 shadow-lg"
        >
          <Play size={20} />
          Іске қосу
        </button>
        <button
          onClick={clearCommands}
          className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-300"
        >
          <Trash2 size={18} />
          Тазалау
        </button>
      </div>

      {result === 'wall' && (
        <p className="text-center text-red-500 font-bold">Қабырғаға соғылды! Қайта көр!</p>
      )}
      {result === 'miss' && (
        <p className="text-center text-red-500 font-bold">Финишке жетпедің! Қайта көр!</p>
      )}
    </div>
  );
}
