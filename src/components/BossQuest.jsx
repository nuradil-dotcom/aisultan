import { useState, useMemo } from 'react';
import { Crown, ChevronRight } from 'lucide-react';
import { pickBossQuestions } from '../data/curriculum';
import { expandLevel } from '../utils/expandLevel';
import { levelToProblem } from '../utils/levelToProblem';
import SudokuGame from './games/SudokuGame';
import ChessGame from './games/ChessGame';
import PatternGame from './games/PatternGame';
import MazeGame from './games/MazeGame';
import MathGame from './games/MathGame';
import MemoryGame from './games/MemoryGame';
import SpatialGame from './games/SpatialGame';
import ReasoningGame from './games/ReasoningGame';
import ProblemSuccessOverlay from './ProblemSuccessOverlay';

function BossQuestion({ question, onDone, onSkip }) {
  const expanded = expandLevel(question);
  const problem = expanded.problems?.[0] || levelToProblem(question);
  const props = { problem, onProblemComplete: onDone, onProblemGiveUp: onSkip };

  switch (question.type) {
    case 'sudoku':
      return <SudokuGame {...props} />;
    case 'chess':
      return <ChessGame {...props} />;
    case 'pattern':
      return <PatternGame {...props} />;
    case 'maze':
      return <MazeGame {...props} />;
    case 'math-add':
    case 'math-sub':
    case 'math-mixed':
    case 'math-sign':
    case 'math-double':
    case 'math-half':
      return <MathGame {...props} levelType={question.type} />;
    case 'memory':
      return <MemoryGame {...props} />;
    case 'spatial':
      return <SpatialGame {...props} />;
    case 'reasoning':
    case 'deduce':
      return <ReasoningGame {...props} />;
    default:
      return <p className="text-center">Белгісіз сұрақ түрі</p>;
  }
}

export default function BossQuest({ moduleId, bossLevel, onComplete }) {
  const questions = useMemo(() => pickBossQuestions(moduleId, 7), [moduleId]);
  const [current, setCurrent] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

  const handleQuestionDone = () => {
    setCelebrating(true);
  };

  const finishCelebration = () => {
    setCelebrating(false);
    if (current + 1 >= questions.length) {
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const skipQuestion = () => {
    if (current + 1 >= questions.length) {
      onComplete();
    } else {
      setCurrent((c) => c + 1);
    }
  };

  return (
    <div className="space-y-6 relative">
      {celebrating && (
        <ProblemSuccessOverlay tenge={0} onDone={finishCelebration} />
      )}
      <div className="text-center bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
        <Crown size={40} className="mx-auto mb-2" />
        <h2 className="text-2xl font-extrabold">{bossLevel.bossTitle}</h2>
        <p className="text-white/90 mt-2 font-semibold">{bossLevel.bossDescription}</p>
      </div>

      <div className="flex justify-center items-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              i < current
                ? 'bg-green-500 text-white'
                : i === current
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-4 text-amber-700 font-bold">
          <ChevronRight size={20} />
          Сұрақ {current + 1} / {questions.length}
        </div>
        <BossQuestion
          key={`${current}-${questions[current].id}`}
          question={questions[current]}
          onDone={handleQuestionDone}
          onSkip={skipQuestion}
        />
      </div>
    </div>
  );
}
