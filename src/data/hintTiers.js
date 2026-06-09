// Бір кеңес ғана — ақшаға сатып алу керек. Жауап бермейді!

const TYPE_HINTS = {
  sudoku: 'Жол мен бағанды тексер. Бос ұяшықта жоқ элементті ойла.',
  chess: 'Жасыл ұяшықтарға ғана жүр. Мақсат 🎯 — соңғы нүкте.',
  pattern: 'Үлгіде не қайталанып тұр? Дауыстап оқы, содан болжа.',
  maze: 'Қабырға ⬛ бар жерден айналып өт. Бір бағытты сына.',
  'math-add': 'Сандарды санап көр. Кіші санды үлкенге қос.',
  'math-sub': 'Үлкен саннан кіші санды ал. Нәтиже кішірейеді.',
  'math-mixed': 'Алдымен + ме - ме? Сосын есепте.',
  'math-sign': 'Қоссақ нәтижеге ұқсай ма? Жоқ болса - ойла.',
  'math-double': 'Екі есе = сол санын тағы бір рет қосу.',
  'math-half': 'Жарты = екеуге тең бөлу. Екі бірдей сан ойла.',
  memory: 'Ретті дауыстап қайтала. Көз алдыңда ойнат.',
  spatial: 'Қара ⬛ қай жерде? Сол жақ пе, оң жақ пе?',
  reasoning: 'Барлығы бір топ па? Біреуі басқа болуы керек.',
  deduce: 'Әңгімені қайта оқы. Сұрақта не сұралады?',
};

export function getProblemHint(level, problem) {
  const base = TYPE_HINTS[level.type] || 'Абайлап ойла. Қадамдап шеш.';

  if (level.type === 'math-sign' && problem) {
    return `Нәтиже ${problem.result}. Қоссақ осыға жетеді ме? Жоқ болса азайту.`;
  }
  if (level.type === 'math-double' && problem) {
    return `${problem.base} + ${problem.base} ойлап көр.`;
  }
  if (level.type === 'math-half' && problem) {
    return `${problem.base} санын екеуге тең бөл.`;
  }
  if (level.type === 'pattern' && problem?.sequence) {
    return `Үлгі: ${problem.sequence.slice(-3).join(' ')} ... Келесі не?`;
  }
  if (level.type === 'chess' && problem) {
    if (problem.piece === 'king') return 'Патша бір қадам жүреді. ⚠️ қызыл жерге барма!';
    if (problem.piece === 'knight') return 'Ат L пішінінде секіреді. Бір қадам ойла.';
    if (problem.piece === 'bishop') return 'Піл тек қиғаш жүреді. Диагональ ойла!';
    if (problem.piece === 'queen') return 'Уәзір түзу де, қиғаш та жүре алады.';
    return 'Тұра тас түзу жүреді. Қабырғаға соғылма.';
  }
  if (level.type === 'memory' && problem) {
    return problem.kind === 'missing' ? 'Ретті дауыстап қайтала. ❓ орны не?' : 'Соңғы элементті есте сақта!';
  }
  if (level.type === 'deduce' && problem?.story) {
    return 'Әңгімені қайта оқы. Сұрақ не туралы?';
  }

  return base;
}
