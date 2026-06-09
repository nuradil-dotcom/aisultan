import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import Navbar from './components/Navbar';
import HomeHub from './components/HomeHub';
import AdventureMap from './components/AdventureMap';
import LevelIntro from './components/LevelIntro';
import LessonScreen from './components/LessonScreen';
import LevelPlayer from './components/LevelPlayer';
import { getLessonForLevel } from './data/lessons';
import BossVictoryOverlay from './components/BossVictoryOverlay';
import { getModule, getLevel } from './data/curriculum';

export default function App() {
  const game = useGameState();
  const [screen, setScreen] = useState('home');
  const [activeModule, setActiveModule] = useState('logic');
  const [pendingLevel, setPendingLevel] = useState(null);

  const goHome = () => {
    setScreen('home');
    setPendingLevel(null);
  };

  const startLevel = (moduleId, levelId) => {
    setPendingLevel({ moduleId, levelId });
    const lessonData = getLessonForLevel(moduleId, levelId);
    if (lessonData && !game.hasSeenLesson(lessonData.conceptId)) {
      setScreen('lesson');
    } else {
      setScreen('intro');
    }
  };

  const handleLevelComplete = (moduleId, levelId, isBoss, levelBonus = 0) => {
    if (!game.isLevelCompleted(moduleId, levelId)) {
      return game.completeLevel(moduleId, levelId, isBoss, levelBonus);
    }
    return { pointsEarned: 0, tengeEarned: 0, isBoss };
  };

  const nextLevel = game.getNextLevel();

  return (
    <div className="min-h-dvh">
      <Navbar
        tengeWallet={game.tengeWallet}
        globalPoints={game.globalPoints}
        onHome={goHome}
      />

      {screen === 'home' && (
        <>
          <HomeHub
            globalPoints={game.globalPoints}
            tengeWallet={game.tengeWallet}
            totalEarned={game.totalEarned}
            completedCount={game.completedCount}
            claimedGoals={game.claimedGoals}
            onClaimGoal={game.claimSavingsGoal}
            onLearn={() => { setScreen('map'); setActiveModule('logic'); }}
            onPlay={() => {
              setScreen('map');
              if (nextLevel) setActiveModule(nextLevel.moduleId);
            }}
            onContinue={() => {
              if (nextLevel) startLevel(nextLevel.moduleId, nextLevel.levelId);
            }}
            nextLevel={nextLevel}
          />
          <button
            onClick={() => {
              if (window.confirm('Барлық прогресті өшіру керек пе?')) game.resetProgress();
            }}
            className="flex items-center gap-1 mx-auto mt-2 mb-6 text-xs text-gray-400 hover:text-gray-600"
          >
            <RotateCcw size={12} />
            Прогресті қайта бастау
          </button>
        </>
      )}

      {screen === 'map' && (
        <AdventureMap
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          onSelectLevel={startLevel}
          isLevelUnlocked={game.isLevelUnlocked}
          isLevelCompleted={game.isLevelCompleted}
          bossPending={game.bossPending}
        />
      )}

      {screen === 'lesson' && pendingLevel && (() => {
        const lessonData = getLessonForLevel(pendingLevel.moduleId, pendingLevel.levelId);
        if (!lessonData) return null;
        return (
          <LessonScreen
            lesson={lessonData.lesson}
            onDone={() => {
              game.markLessonSeen(lessonData.conceptId);
              setScreen('intro');
            }}
            onSkip={() => {
              game.markLessonSeen(lessonData.conceptId);
              setScreen('intro');
            }}
          />
        );
      })()}

      {screen === 'intro' && pendingLevel && (() => {
        const mod = getModule(pendingLevel.moduleId);
        const level = getLevel(pendingLevel.moduleId, pendingLevel.levelId);
        if (!mod || !level) return null;
        return (
          <LevelIntro
            mod={mod}
            level={level}
            isBoss={level.isBoss}
            onStart={() => setScreen('play')}
            onBack={() => setScreen('map')}
          />
        );
      })()}

      {screen === 'play' && pendingLevel && (
        <LevelPlayer
          moduleId={pendingLevel.moduleId}
          levelId={pendingLevel.levelId}
          onBack={() => setScreen('map')}
          onComplete={handleLevelComplete}
          onEarnProblem={game.earnProblemReward}
          isLevelCompleted={game.isLevelCompleted}
          tengeWallet={game.tengeWallet}
          onSpendTenge={game.spendTenge}
        />
      )}

      {game.bossPending && <BossVictoryOverlay onApprove={game.approveBossReward} />}
    </div>
  );
}
