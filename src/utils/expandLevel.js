import { PROBLEM_COUNTS, getLevelRewards } from '../data/rewards';
import { shuffleArray } from '../data/curriculum';
import { generateMathProblems } from './mathGenerator';
import { generateSudokuBatch } from './sudokuGenerator';
import { generatePatternBatch } from './patternGenerator';
import { generateMazeBatch } from './mazeGenerator';
import { generateChessBatch } from './chessGenerator';
import { generateMemoryBatch } from './memoryGenerator';
import { generateSpatialBatch } from './spatialGenerator';
import { generateReasoningBatch } from './reasoningGenerator';
import { dedupeProblems } from './problemQuality';

function fillProblems(generator, difficulty, count, seed) {
  let problems = generator(difficulty, count, seed);
  problems = dedupeProblems(problems);
  let extra = 0;
  while (problems.length < count && extra < count * 30) {
    extra++;
    const more = generator(difficulty, count - problems.length, null);
    problems = dedupeProblems([...problems, ...more]);
  }
  return problems.slice(0, count);
}

export function expandLevel(level) {
  if (level.isBoss) return { ...level, rewards: null, problems: [] };

  const rewards = getLevelRewards(level.id);
  const count = PROBLEM_COUNTS[rewards.difficulty];
  let problems = [];

  if (level.type === 'sudoku') {
    const seed = { initial: level.initial, solution: level.solution, emojis: level.emojis };
    problems = generateSudokuBatch(level.emojis, rewards.difficulty, count, seed).map((p) => ({
      emojis: level.emojis,
      initial: p.initial,
      solution: p.solution,
    }));
  } else if (level.type === 'chess') {
    const seed = {
      piece: level.piece,
      pieceSymbol: level.pieceSymbol,
      pieceLabel: level.pieceLabel,
      start: level.start,
      target: level.target,
      obstacles: level.obstacles || [],
      minMoves: level.minMoves || 1,
      dangerZones: level.dangerZones || [],
    };
    problems = generateChessBatch(rewards.difficulty, count, seed);
  } else if (level.type === 'pattern') {
    const seedRounds = level.rounds || [{
      sequence: level.sequence,
      choices: level.choices,
      answer: level.answer,
    }];
    problems = fillProblems(
      (d, c) => generatePatternBatch(d, c, seedRounds),
      rewards.difficulty,
      count
    );
  } else if (level.type === 'maze') {
    const seed = {
      grid: level.grid,
      start: level.start,
      end: level.end,
      solution: level.solution,
    };
    problems = generateMazeBatch(rewards.difficulty, count, seed);
  } else if (level.type.startsWith('math-')) {
    const seed = level.problems || [];
    problems = generateMathProblems(level.type, rewards.difficulty, count, seed);
  } else if (level.type === 'memory') {
    problems = fillProblems(
      (d, c) => generateMemoryBatch(d, c, level.seed ? [level.seed] : []),
      rewards.difficulty,
      count
    );
  } else if (level.type === 'spatial') {
    problems = fillProblems(
      (d, c) => generateSpatialBatch(d, c, level.seed || null),
      rewards.difficulty,
      count
    );
  } else if (level.type === 'reasoning') {
    problems = fillProblems(
      (d, c) => generateReasoningBatch(d, c, [], 'odd'),
      rewards.difficulty,
      count
    );
  } else if (level.type === 'deduce') {
    problems = fillProblems(
      (d, c) => generateReasoningBatch(d, c, [], 'deduce'),
      rewards.difficulty,
      count
    );
  }

  problems = dedupeProblems(problems);

  return {
    ...level,
    rewards,
    problems,
    problemCount: problems.length,
  };
}
