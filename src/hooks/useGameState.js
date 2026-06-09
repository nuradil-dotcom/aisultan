import { useState, useEffect, useCallback } from 'react';
import { MODULES } from '../data/curriculum';
import { BOSS_REWARD, POINTS_PER_PROBLEM } from '../data/rewards';

const POINTS_KEY = 'globalPoints';
const WALLET_KEY = 'tengeWallet';
const PROGRESS_KEY = 'levelProgress';
const BOSS_PENDING_KEY = 'bossPendingApproval';
const LAST_PLAYED_KEY = 'lastPlayed';
const TOTAL_EARNED_KEY = 'totalEarned';
const CLAIMED_GOALS_KEY = 'claimedGoals';
const SEEN_LESSONS_KEY = 'seenLessons';

function loadNumber(key, fallback = 0) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? Number(val) : fallback;
  } catch {
    return fallback;
  }
}

function loadJSON(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export function useGameState() {
  const [globalPoints, setGlobalPoints] = useState(() => loadNumber(POINTS_KEY));
  const [tengeWallet, setTengeWallet] = useState(() => loadNumber(WALLET_KEY));
  const [totalEarned, setTotalEarned] = useState(() => loadNumber(TOTAL_EARNED_KEY));
  const [progress, setProgress] = useState(() => loadJSON(PROGRESS_KEY, {}));
  const [claimedGoals, setClaimedGoals] = useState(() => loadJSON(CLAIMED_GOALS_KEY, []));
  const [lastPlayed, setLastPlayed] = useState(() => loadJSON(LAST_PLAYED_KEY, null));
  const [seenLessons, setSeenLessons] = useState(() => loadJSON(SEEN_LESSONS_KEY, []));
  const [bossPending, setBossPending] = useState(() => {
    try {
      return localStorage.getItem(BOSS_PENDING_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => { localStorage.setItem(POINTS_KEY, String(globalPoints)); }, [globalPoints]);
  useEffect(() => { localStorage.setItem(WALLET_KEY, String(tengeWallet)); }, [tengeWallet]);
  useEffect(() => { localStorage.setItem(TOTAL_EARNED_KEY, String(totalEarned)); }, [totalEarned]);
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem(CLAIMED_GOALS_KEY, JSON.stringify(claimedGoals)); }, [claimedGoals]);
  useEffect(() => { localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify(lastPlayed)); }, [lastPlayed]);
  useEffect(() => { localStorage.setItem(BOSS_PENDING_KEY, String(bossPending)); }, [bossPending]);
  useEffect(() => { localStorage.setItem(SEEN_LESSONS_KEY, JSON.stringify(seenLessons)); }, [seenLessons]);

  const completedCount = Object.values(progress).filter(Boolean).length;

  const isLevelUnlocked = useCallback(
    (moduleId, levelId) => {
      if (bossPending) return false;
      if (levelId === 1) return true;
      const key = `${moduleId}-${levelId - 1}`;
      return progress[key] === true;
    },
    [progress, bossPending]
  );

  const isLevelCompleted = useCallback(
    (moduleId, levelId) => progress[`${moduleId}-${levelId}`] === true,
    [progress]
  );

  const getNextLevel = useCallback(() => {
    for (const mod of MODULES) {
      for (const level of mod.levels) {
        if (!progress[`${mod.id}-${level.id}`] && isLevelUnlocked(mod.id, level.id)) {
          return { moduleId: mod.id, levelId: level.id };
        }
      }
    }
    return null;
  }, [progress, isLevelUnlocked]);

  const earnProblemReward = useCallback((tenge, points = POINTS_PER_PROBLEM) => {
    setTengeWallet((w) => w + tenge);
    setGlobalPoints((p) => p + points);
    setTotalEarned((t) => t + tenge);
  }, []);

  const completeLevel = useCallback((moduleId, levelId, isBoss = false, levelBonus = 0) => {
    const key = `${moduleId}-${levelId}`;
    setProgress((prev) => ({ ...prev, [key]: true }));
    setLastPlayed({ moduleId, levelId });

    const pointsEarned = isBoss ? BOSS_REWARD.points : 5;
    const tengeEarned = isBoss ? BOSS_REWARD.tenge : levelBonus;

    setGlobalPoints((p) => p + pointsEarned);
    setTengeWallet((w) => w + tengeEarned);
    setTotalEarned((t) => t + tengeEarned);

    if (isBoss) setBossPending(true);

    return { pointsEarned, tengeEarned, isBoss };
  }, []);

  const spendTenge = useCallback((amount) => {
    if (tengeWallet < amount) return false;
    setTengeWallet((w) => w - amount);
    return true;
  }, [tengeWallet]);

  const claimSavingsGoal = useCallback((goalId, target) => {
    if (tengeWallet < target) return false;
    if (claimedGoals.includes(goalId)) return false;
    setTengeWallet((w) => w - target);
    setClaimedGoals((g) => [...g, goalId]);
    return true;
  }, [tengeWallet, claimedGoals]);

  const hasSeenLesson = useCallback(
    (conceptId) => seenLessons.includes(conceptId),
    [seenLessons]
  );

  const markLessonSeen = useCallback((conceptId) => {
    setSeenLessons((prev) => (prev.includes(conceptId) ? prev : [...prev, conceptId]));
  }, []);

  const approveBossReward = useCallback(() => setBossPending(false), []);

  const resetProgress = useCallback(() => {
    setProgress({});
    setGlobalPoints(0);
    setTengeWallet(0);
    setTotalEarned(0);
    setClaimedGoals([]);
    setLastPlayed(null);
    setSeenLessons([]);
    setBossPending(false);
    [PROGRESS_KEY, POINTS_KEY, WALLET_KEY, TOTAL_EARNED_KEY, CLAIMED_GOALS_KEY,
      LAST_PLAYED_KEY, BOSS_PENDING_KEY, SEEN_LESSONS_KEY
    ].forEach((k) => localStorage.removeItem(k));
  }, []);

  return {
    globalPoints,
    tengeWallet,
    totalEarned,
    progress,
    claimedGoals,
    lastPlayed,
    bossPending,
    seenLessons,
    completedCount,
    hasSeenLesson,
    markLessonSeen,
    isLevelUnlocked,
    isLevelCompleted,
    getNextLevel,
    earnProblemReward,
    completeLevel,
    spendTenge,
    claimSavingsGoal,
    approveBossReward,
    resetProgress,
  };
}
