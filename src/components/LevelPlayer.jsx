import { useState, useCallback, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getModule, getLevel } from '../data/curriculum';
import { getLevelLearning } from '../data/learning';
import { getProblemHint } from '../data/hintTiers';
import { HINT_COST_PER_PROBLEM } from '../data/rewards';
import { expandLevel } from '../utils/expandLevel';
import MascotHelper from './MascotHelper';
import ProblemProgress from './ProblemProgress';
import BossQuest from './BossQuest';
import RewardCeremony from './RewardCeremony';
import SudokuGame from './games/SudokuGame';
import ChessGame from './games/ChessGame';
import PatternGame from './games/PatternGame';
import MazeGame from './games/MazeGame';
import MathGame from './games/MathGame';
import MemoryGame from './games/MemoryGame';
import SpatialGame from './games/SpatialGame';
import ReasoningGame from './games/ReasoningGame';

function GameRenderer({ level, problem, onProblemComplete, onProblemGiveUp, onStruggle, activeHint }) {
  const props = { problem, onProblemComplete, onProblemGiveUp, onStruggle, activeHint, levelType: level.type };

  switch (level.type) {
    case 'sudoku': return <SudokuGame {...props} />;
    case 'chess': return <ChessGame {...props} />;
    case 'pattern': return <PatternGame {...props} />;
    case 'maze': return <MazeGame {...props} />;
    case 'math-add':
    case 'math-sub':
    case 'math-mixed':
    case 'math-sign':
    case 'math-double':
    case 'math-half':
      return <MathGame {...props} levelType={level.type} />;
    case 'memory': return <MemoryGame {...props} />;
    case 'spatial': return <SpatialGame {...props} />;
    case 'reasoning':
    case 'deduce':
      return <ReasoningGame {...props} />;
    default: return null;
  }
}

export default function LevelPlayer({
  moduleId,
  levelId,
  onBack,
  onComplete,
  onEarnProblem,
  isLevelCompleted,
  tengeWallet,
  onSpendTenge,
}) {
  const [reward, setReward] = useState(null);
  const [problemIndex, setProblemIndex] = useState(0);
  const [sessionTenge, setSessionTenge] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [activeHint, setActiveHint] = useState(null);
  const [earnFlash, setEarnFlash] = useState(null);

  const mod = getModule(moduleId);
  const baseLevel = getLevel(moduleId, levelId);
  const expanded = useMemo(() => baseLevel ? expandLevel(baseLevel) : null, [baseLevel]);
  const alreadyDone = isLevelCompleted(moduleId, levelId);

  const currentProblem = expanded?.problems?.[problemIndex];
  const totalProblems = expanded?.problems?.length || 0;
  const rewards = expanded?.rewards;

  const onStruggle = useCallback(() => {}, []);

  const handleBuyHint = useCallback(() => {
    if (hintUsed || !currentProblem) return;
    if (!onSpendTenge(HINT_COST_PER_PROBLEM)) return;
    const text = getProblemHint(expanded, currentProblem);
    setActiveHint(text);
    setHintUsed(true);
  }, [hintUsed, currentProblem, expanded, onSpendTenge]);

  const goToNextProblem = useCallback(() => {
    setProblemIndex((i) => i + 1);
    setHintUsed(false);
    setActiveHint(null);
  }, []);

  const finishLevel = useCallback(() => {
    if (!rewards || alreadyDone) {
      onBack();
      return;
    }
    const learning = getLevelLearning(expanded);
    const earned = onComplete(moduleId, levelId, false, rewards.levelBonus);
    setReward({
      pointsEarned: sessionPoints + earned.pointsEarned,
      tengeEarned: sessionTenge + earned.tengeEarned,
      learnSummary: learning.earned,
      isBoss: false,
      problemsSolved: totalProblems,
      levelBonus: rewards.levelBonus,
      perProblemTenge: rewards.tengePerProblem,
    });
  }, [rewards, alreadyDone, expanded, onComplete, moduleId, levelId, sessionPoints, sessionTenge, onBack]);

  const handleProblemGiveUp = useCallback(() => {
    if (problemIndex + 1 >= totalProblems) {
      finishLevel();
    } else {
      goToNextProblem();
    }
  }, [problemIndex, totalProblems, finishLevel, goToNextProblem]);

  const handleProblemComplete = useCallback(() => {
    if (!rewards || alreadyDone) {
      if (problemIndex + 1 >= totalProblems) onBack();
      else goToNextProblem();
      return;
    }

    const t = rewards.tengePerProblem;
    const p = rewards.pointsPerProblem;
    onEarnProblem(t, p);
    setSessionTenge((s) => s + t);
    setSessionPoints((s) => s + p);
    setEarnFlash(`+${t} ₸`);
    setTimeout(() => setEarnFlash(null), 1200);

    if (problemIndex + 1 >= totalProblems) {
      const learning = getLevelLearning(expanded);
      const earned = onComplete(moduleId, levelId, false, rewards.levelBonus);
      setReward({
        pointsEarned: sessionPoints + p + earned.pointsEarned,
        tengeEarned: sessionTenge + t + earned.tengeEarned,
        learnSummary: learning.earned,
        isBoss: false,
        problemsSolved: totalProblems,
        levelBonus: rewards.levelBonus,
        perProblemTenge: rewards.tengePerProblem,
      });
    } else {
      setProblemIndex((i) => i + 1);
      setHintUsed(false);
      setActiveHint(null);
    }
  }, [rewards, alreadyDone, problemIndex, totalProblems, onEarnProblem, onComplete, moduleId, levelId, expanded, sessionTenge, sessionPoints, goToNextProblem, onBack]);

  const handleBossComplete = () => {
    if (!alreadyDone) {
      const learning = getLevelLearning(expanded);
      const earned = onComplete(moduleId, levelId, true, 0);
      setReward({
        pointsEarned: earned.pointsEarned,
        tengeEarned: earned.tengeEarned,
        learnSummary: learning.earned,
        isBoss: true,
      });
    } else onBack();
  };

  if (!mod || !expanded) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 font-bold">Деңгей табылмады</p>
        <button onClick={onBack} className="mt-4 text-violet-600 font-bold">Артқа</button>
      </div>
    );
  }

  if (reward) {
    return <RewardCeremony {...reward} onContinue={onBack} />;
  }

  const isBoss = expanded.isBoss;

  return (
    <div className="max-w-lg mx-auto px-3 py-3 pb-safe-fab relative">
      {earnFlash && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full font-extrabold text-lg shadow-xl animate-bounce-once">
          {earnFlash}
        </div>
      )}

      <button onClick={onBack} className="touch-target flex items-center gap-2 text-violet-600 font-bold mb-3 -ml-1 px-1 active:opacity-70">
        <ArrowLeft size={20} />
        Артқа қайту
      </button>

      <div className={`rounded-2xl px-4 py-3 mb-4 text-sm font-bold text-center ${
        isBoss ? 'bg-amber-100 text-amber-800' : `bg-gradient-to-r ${mod.color} text-white`
      }`}>
        {mod.title} — {expanded.title}
        {!isBoss && rewards && (
          <span className="block text-xs font-semibold mt-1 opacity-90">
            {totalProblems} сұрақ × {rewards.tengePerProblem}₸ + {rewards.levelBonus}₸ бонус
          </span>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-4 border-2 border-violet-100">
        {isBoss ? (
          <BossQuest moduleId={moduleId} bossLevel={expanded} onComplete={handleBossComplete} />
        ) : (
          <>
            {rewards && (
              <ProblemProgress
                problemIndex={problemIndex}
                totalProblems={totalProblems}
                sessionTenge={sessionTenge}
                difficulty={rewards.difficulty}
                tengePerProblem={rewards.tengePerProblem}
              />
            )}
            {activeHint && (
              <div className="mb-3 text-xs text-violet-700 bg-violet-50 rounded-lg p-2 border border-violet-200">
                <span className="font-bold">💡 Кеңес: </span>{activeHint}
              </div>
            )}
            {currentProblem && (
              <GameRenderer
                key={`${problemIndex}-${expanded.type}`}
                level={expanded}
                problem={currentProblem}
                onProblemComplete={handleProblemComplete}
                onProblemGiveUp={handleProblemGiveUp}
                onStruggle={onStruggle}
                activeHint={activeHint}
              />
            )}
          </>
        )}
      </div>

      {!isBoss && (
        <MascotHelper
          hintText={activeHint}
          hintUsed={hintUsed}
          onBuyHint={handleBuyHint}
          tengeWallet={tengeWallet}
          canAfford={!hintUsed && tengeWallet >= HINT_COST_PER_PROBLEM}
        />
      )}
    </div>
  );
}
