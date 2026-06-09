import { DIFFICULTY_LABELS } from '../data/rewards';

export default function ProblemProgress({
  problemIndex,
  totalProblems,
  sessionTenge,
  difficulty,
  tengePerProblem,
}) {
  const pct = totalProblems > 0 ? ((problemIndex) / totalProblems) * 100 : 0;

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-gray-600">
        <span>
          {DIFFICULTY_LABELS[difficulty]} · Сұрақ {problemIndex + 1}/{totalProblems}
        </span>
        <span className="text-green-600">+{sessionTenge} ₸</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 text-center">
        Әр дұрыс жауап: +{tengePerProblem} ₸
      </p>
    </div>
  );
}
