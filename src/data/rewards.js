export function getDifficulty(levelId) {
  if (levelId <= 3) return 'easy';
  if (levelId <= 7) return 'medium';
  return 'hard';
}

export const DIFFICULTY_LABELS = {
  easy: 'Оңай',
  medium: 'Орта',
  hard: 'Қиын',
};

// More problems per level — can't rush the whole game in one evening
export const PROBLEM_COUNTS = {
  easy: 10,
  medium: 12,
  hard: 15,
};

// Lower tenge — virtual ₸ maps to real parental payouts
export const TENGE_PER_PROBLEM = {
  easy: 5,
  medium: 8,
  hard: 12,
};

export const POINTS_PER_PROBLEM = 1;

export const LEVEL_COMPLETE_BONUS = {
  easy: 15,
  medium: 25,
  hard: 40,
};

export const BOSS_REWARD = { points: 30, tenge: 250 };

export const HINT_COST_PER_PROBLEM = 25;

export function getLevelRewards(levelId) {
  const d = getDifficulty(levelId);
  const count = PROBLEM_COUNTS[d];
  const perProblem = TENGE_PER_PROBLEM[d];
  const bonus = LEVEL_COMPLETE_BONUS[d];
  return {
    difficulty: d,
    problemCount: count,
    tengePerProblem: perProblem,
    pointsPerProblem: POINTS_PER_PROBLEM,
    levelBonus: bonus,
    maxTenge: count * perProblem + bonus,
  };
}
