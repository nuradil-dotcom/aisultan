import { EXTRA_MODULES } from './extraModules';

export const MODULES = [
  {
    id: 'logic',
    title: 'Логика Ойыны',
    subtitle: 'Судоку және тас жүрісі',
    color: 'from-violet-500 to-purple-600',
    icon: '♟️',
    levels: [
      {
        id: 1,
        title: 'Жеміс Судоку — 1',
        type: 'sudoku',
        isBoss: false,
        hint: 'Жол мен бағанды екеуін де ойла! Бір сурет екі рет болмауы керек!',
        emojis: ['🍎', '🍌', '🍇', '🍊'],
        initial: [
          [null, null, null, '🍊'],
          [null, '🍊', null, null],
          [null, null, '🍊', null],
          ['🍊', null, null, null],
        ],
        solution: [
          ['🍎', '🍌', '🍇', '🍊'],
          ['🍇', '🍊', '🍌', '🍎'],
          ['🍌', '🍎', '🍊', '🍇'],
          ['🍊', '🍇', '🍎', '🍌'],
        ],
      },
      {
        id: 2,
        title: 'Жеміс Судоку — 2',
        type: 'sudoku',
        isBoss: false,
        hint: 'Бағанды да тексер! Кейде жол дұрыс, баған қате болады!',
        emojis: ['🍎', '🍌', '🍇', '🍊'],
        initial: [
          [null, null, '🍇', null],
          ['🍇', null, null, null],
          [null, null, null, '🍎'],
          [null, '🍎', null, null],
        ],
        solution: [
          ['🍎', '🍌', '🍇', '🍊'],
          ['🍇', '🍊', '🍎', '🍌'],
          ['🍌', '🍇', '🍊', '🍎'],
          ['🍊', '🍎', '🍌', '🍇'],
        ],
      },
      {
        id: 3,
        title: 'Хайуан Судоку',
        type: 'sudoku',
        isBoss: false,
        hint: 'Тек 4 белгі бар! Көп ойлау керек!',
        emojis: ['🐱', '🐶', '🐰', '🐻'],
        initial: [
          [null, null, '🐰', null],
          [null, '🐻', null, null],
          [null, null, null, '🐱'],
          ['🐶', null, null, null],
        ],
        solution: [
          ['🐱', '🐶', '🐰', '🐻'],
          ['🐰', '🐻', '🐱', '🐶'],
          ['🐻', '🐰', '🐶', '🐱'],
          ['🐶', '🐱', '🐻', '🐰'],
        ],
      },
      {
        id: 4,
        title: 'Гүл Судоку — Қиын',
        type: 'sudoku',
        isBoss: false,
        hint: '3 ғана белгі! Әр бос ұяшықты абайлап толтыр!',
        emojis: ['🌸', '🌻', '🌹', '🌷'],
        initial: [
          [null, null, null, '🌷'],
          [null, '🌸', null, null],
          [null, null, '🌻', null],
          ['🌹', null, null, null],
        ],
        solution: [
          ['🌻', '🌹', '🌸', '🌷'],
          ['🌷', '🌸', '🌹', '🌻'],
          ['🌸', '🌷', '🌻', '🌹'],
          ['🌹', '🌻', '🌷', '🌸'],
        ],
      },
      {
        id: 5,
        title: 'Спорт Судоку — Шебер',
        type: 'sudoku',
        isBoss: false,
        hint: 'Тек 2 белгі! Нағыз судоку шебері сынағы!',
        emojis: ['⚽', '🏀', '🎾', '🏐'],
        initial: [
          [null, null, null, null],
          [null, '🎾', null, null],
          [null, null, null, '⚽'],
          ['🏐', null, null, null],
        ],
        solution: [
          ['⚽', '🏐', '🏀', '🎾'],
          ['🏀', '🎾', '⚽', '🏐'],
          ['🎾', '🏀', '🏐', '⚽'],
          ['🏐', '⚽', '🎾', '🏀'],
        ],
      },
      {
        id: 6,
        title: 'Тұра тас — Бұрыштан бұрышқа',
        type: 'chess',
        isBoss: false,
        hint: 'Бір қадаммен жетпейсің! Айналып жүру керек!',
        piece: 'rook',
        pieceSymbol: '♜',
        pieceLabel: 'Тұра тас',
        start: { row: 7, col: 0 },
        target: { row: 0, col: 7 },
        obstacles: [{ row: 7, col: 4 }],
        minMoves: 2,
      },
      {
        id: 7,
        title: 'Піл — Қиғаш жол',
        type: 'chess',
        isBoss: false,
        hint: 'Піл тек қиғаш жүреді! Бір түзу сызық бойымен емес!',
        piece: 'bishop',
        pieceSymbol: '♝',
        pieceLabel: 'Піл',
        start: { row: 7, col: 2 },
        target: { row: 2, col: 7 },
        obstacles: [{ row: 4, col: 4 }],
        minMoves: 2,
      },
      {
        id: 8,
        title: 'Ат — 3 қадам',
        type: 'chess',
        isBoss: false,
        hint: 'Бір секірумен жетпейсің! Жолды жоспарла!',
        piece: 'knight',
        pieceSymbol: '♞',
        pieceLabel: 'Ат',
        start: { row: 7, col: 0 },
        target: { row: 1, col: 2 },
        obstacles: [{ row: 5, col: 1 }],
        minMoves: 3,
      },
      {
        id: 9,
        title: 'Уәзір — Күшті тас',
        type: 'chess',
        isBoss: false,
        hint: 'Уәзір түзу де, қиғаш та жүре алады! Ең күшті тас!',
        piece: 'queen',
        pieceSymbol: '♛',
        pieceLabel: 'Уәзір',
        start: { row: 7, col: 3 },
        target: { row: 0, col: 3 },
        obstacles: [{ row: 4, col: 3 }, { row: 2, col: 1 }],
        minMoves: 2,
      },
      {
        id: 10,
        title: 'Босс Квест — Логика Шебері',
        type: 'boss',
        isBoss: true,
        hint: null,
        bossTitle: 'Логика Босс Квесті',
        bossDescription: 'Судоку мен тас жүрісінен 7 сұрақ! Көмекші жоқ!',
      },
    ],
  },
  {
    id: 'algorithm',
    title: 'Қисын Әлемі',
    subtitle: 'Алгоритмдік логика',
    color: 'from-sky-500 to-cyan-600',
    icon: '🧩',
    levels: [
      {
        id: 1,
        title: 'Түс Үлгісі',
        type: 'pattern',
        isBoss: false,
        hint: 'Әр үлгіде реттілікті тап! 2 үлгі бар!',
        rounds: [
          {
            sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'],
            choices: ['🔵', '🟢', '🔴', '🟡'],
            answer: '🔵',
          },
          {
            sequence: ['🟡', '🟢', '🟡', '🟢', '🟡'],
            choices: ['🟢', '🔴', '🟡', '🔵'],
            answer: '🟢',
          },
        ],
      },
      {
        id: 2,
        title: 'AABB Үлгісі',
        type: 'pattern',
        isBoss: false,
        hint: 'Екі рет бірдей, екі рет басқасы! Мұны ABAB-тен өзге!',
        rounds: [
          {
            sequence: ['⭕', '⭕', '⬜', '⬜', '⭕'],
            choices: ['⭕', '⬜', '⬜', '🔺'],
            answer: '⭕',
          },
          {
            sequence: ['🔺', '🔺', '⭐', '⭐', '🔺'],
            choices: ['🔺', '⭐', '⭕', '⭐⭐'],
            answer: '🔺',
          },
        ],
      },
      {
        id: 3,
        title: '123 Үлгісі — 3 раунд',
        type: 'pattern',
        isBoss: false,
        hint: '1-2-3 қайталанады! 3 дұрыс жауап керек!',
        rounds: [
          {
            sequence: ['1️⃣', '2️⃣', '3️⃣', '1️⃣', '2️⃣'],
            choices: ['3️⃣', '4️⃣', '1️⃣', '5️⃣'],
            answer: '3️⃣',
          },
          {
            sequence: ['2️⃣', '3️⃣', '1️⃣', '2️⃣', '3️⃣'],
            choices: ['1️⃣', '2️⃣', '4️⃣', '3️⃣'],
            answer: '1️⃣',
          },
          {
            sequence: ['3️⃣', '1️⃣', '2️⃣', '3️⃣', '1️⃣'],
            choices: ['2️⃣', '3️⃣', '1️⃣', '4️⃣'],
            answer: '2️⃣',
          },
        ],
      },
      {
        id: 4,
        title: 'Өсу Үлгісі',
        type: 'pattern',
        isBoss: false,
        hint: 'Әр келесісі үлкенейді! Санды қосып қара!',
        rounds: [
          {
            sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
            choices: ['⭐⭐⭐⭐⭐⭐', '⭐⭐⭐', '⭐', '⭐⭐'],
            answer: '⭐⭐⭐⭐⭐⭐',
          },
          {
            sequence: ['1️⃣', '3️⃣', '5️⃣', '7️⃣', '9️⃣'],
            choices: ['0️⃣', '8️⃣', '🔟', '6️⃣'],
            answer: '🔟',
          },
        ],
      },
      {
        id: 5,
        title: 'ABCD — Толық цикл',
        type: 'pattern',
        isBoss: false,
        hint: '4 әртүрлі элемент қайталанады! Ең қиын үлгі!',
        rounds: [
          {
            sequence: ['🅰️', '🅱️', '🅲', '🅳️', '🅰️', '🅱️'],
            choices: ['🅲', '🅳️', '🅰️', '🅴️'],
            answer: '🅲',
          },
          {
            sequence: ['🔴', '🟡', '🔵', '🟢', '🔴', '🟡'],
            choices: ['🟢', '🔵', '🔴', '⚫'],
            answer: '🔵',
          },
          {
            sequence: ['🐱', '🐶', '🐰', '🐻', '🐱', '🐶'],
            choices: ['🐻', '🐰', '🐱', '🦁'],
            answer: '🐰',
          },
        ],
      },
      {
        id: 6,
        title: 'Лабиринт — Бастау',
        type: 'maze',
        isBoss: false,
        hint: 'Жоғары, Төмен, Оңға, Солға бағыттарын қой!',
        grid: [
          ['S', '.', '.', '.', '.'],
          ['#', '#', '.', '#', '.'],
          ['.', '.', '.', '.', '.'],
          ['.', '#', '#', '#', '.'],
          ['.', '.', '.', '.', 'E'],
        ],
        start: { row: 0, col: 0 },
        end: { row: 4, col: 4 },
        solution: ['Оңға', 'Оңға', 'Төмен', 'Төмен', 'Оңға', 'Оңға', 'Төмен', 'Төмен'],
      },
      {
        id: 7,
        title: 'Лабиринт — Бұрылыс',
        type: 'maze',
        isBoss: false,
        hint: 'Қабырғалардан айналып өт!',
        grid: [
          ['S', '.', '#', '.', '.'],
          ['.', '.', '#', '.', '#'],
          ['.', '#', '.', '.', '.'],
          ['.', '.', '.', '#', '.'],
          ['#', '#', '.', '.', 'E'],
        ],
        start: { row: 0, col: 0 },
        end: { row: 4, col: 4 },
        solution: ['Төмен', 'Төмен', 'Төмен', 'Оңға', 'Оңға', 'Жоғары', 'Оңға', 'Оңға', 'Төмен', 'Төмен'],
      },
      {
        id: 8,
        title: 'Лабиринт — 7x7',
        type: 'maze',
        isBoss: false,
        hint: 'Үлкен лабиринт! 20+ қадам керек болуы мүмкін!',
        grid: [
          ['S', '.', '.', '#', '.', '.', '.'],
          ['#', '#', '.', '#', '.', '#', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '#', '#', '#', '#', '#', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '#', '#', '.', '#', '#', '.'],
          ['.', '.', '.', '.', '.', '.', 'E'],
        ],
        start: { row: 0, col: 0 },
        end: { row: 6, col: 6 },
        solution: ['Оңға', 'Оңға', 'Төмен', 'Төмен', 'Оңға', 'Оңға', 'Оңға', 'Оңға', 'Төмен', 'Төмен', 'Төмен', 'Төмен'],
      },
      {
        id: 9,
        title: 'Лабиринт — Шебер',
        type: 'maze',
        isBoss: false,
        hint: 'Ең қиын! Қысқа жол жоқ — абайлап жоспарла!',
        grid: [
          ['S', '.', '#', '.', '.', '.', '.'],
          ['.', '#', '.', '#', '#', '.', '#'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['#', '#', '#', '.', '#', '#', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '#', '#', '#', '.', '#', '.'],
          ['#', '.', '.', '.', '.', '.', 'E'],
        ],
        start: { row: 0, col: 0 },
        end: { row: 6, col: 6 },
        solution: ['Төмен', 'Төмен', 'Оңға', 'Оңға', 'Оңға', 'Оңға', 'Оңға', 'Оңға', 'Төмен', 'Төмен', 'Төмен', 'Төмен'],
      },
      {
        id: 10,
        title: 'Босс Квест — Қисын Шебері',
        type: 'boss',
        isBoss: true,
        hint: null,
        bossTitle: 'Қисын Босс Квесті',
        bossDescription: 'Алдыңғы 9 деңгейден 7 кездейсоқ сұрақ! Көмекші жоқ!',
      },
    ],
  },
  {
    id: 'math',
    title: 'Шапшаң Есеп',
    subtitle: 'Математика матрицасы',
    color: 'from-emerald-500 to-green-600',
    icon: '🔢',
    levels: [
      {
        id: 1,
        title: 'Қосу — 20-ға дейін',
        type: 'math-add',
        isBoss: false,
        hint: 'Зере ойла! 5 есепті дұрыс шеш!',
        problems: [
          { a: 9, b: 8, op: '+', answer: 17 },
          { a: 7, b: 6, op: '+', answer: 13 },
          { a: 8, b: 5, op: '+', answer: 13 },
          { a: 12, b: 4, op: '+', answer: 16 },
          { a: 9, b: 9, op: '+', answer: 18 },
        ],
      },
      {
        id: 2,
        title: 'Азайту — 20-ға дейін',
        type: 'math-sub',
        isBoss: false,
        hint: 'Үлкен саннан кіші санды ал! 5 есеп!',
        problems: [
          { a: 18, b: 9, op: '-', answer: 9 },
          { a: 15, b: 7, op: '-', answer: 8 },
          { a: 20, b: 8, op: '-', answer: 12 },
          { a: 17, b: 6, op: '-', answer: 11 },
          { a: 14, b: 5, op: '-', answer: 9 },
        ],
      },
      {
        id: 3,
        title: 'Аралас — Жылдам',
        type: 'math-mixed',
        isBoss: false,
        hint: '+ немесе -? Белгіні алдымен ойла, сосын есепте!',
        problems: [
          { a: 13, b: 5, op: '+', answer: 18 },
          { a: 16, b: 7, op: '-', answer: 9 },
          { a: 8, b: 8, op: '+', answer: 16 },
          { a: 19, b: 4, op: '-', answer: 15 },
          { a: 11, b: 6, op: '+', answer: 17 },
          { a: 20, b: 11, op: '-', answer: 9 },
        ],
      },
      {
        id: 4,
        title: 'Белгі тап — 1',
        type: 'math-sign',
        isBoss: false,
        hint: 'Қоссақ шыға ма? Азайтсақ шыға ма? Сол ойла!',
        problems: [
          { a: 8, b: 5, result: 13, answer: '+' },
          { a: 15, b: 7, result: 8, answer: '-' },
          { a: 6, b: 9, result: 15, answer: '+' },
          { a: 18, b: 9, result: 9, answer: '-' },
          { a: 4, b: 4, result: 8, answer: '+' },
        ],
      },
      {
        id: 5,
        title: 'Белгі тап — 2',
        type: 'math-sign',
        isBoss: false,
        hint: 'Кей есептерде екеуі де сияқты — абайла!',
        problems: [
          { a: 12, b: 3, result: 15, answer: '+' },
          { a: 14, b: 6, result: 8, answer: '-' },
          { a: 7, b: 8, result: 15, answer: '+' },
          { a: 20, b: 5, result: 15, answer: '-' },
          { a: 9, b: 9, result: 18, answer: '+' },
          { a: 11, b: 11, result: 0, answer: '-' },
        ],
      },
      {
        id: 6,
        title: 'Белгі тап — 3',
        type: 'math-sign',
        isBoss: false,
        hint: 'Нөл (0) бар есептерге назар аудар!',
        problems: [
          { a: 0, b: 13, result: 13, answer: '+' },
          { a: 16, b: 0, result: 16, answer: '+' },
          { a: 15, b: 15, result: 0, answer: '-' },
          { a: 8, b: 3, result: 5, answer: '-' },
          { a: 10, b: 10, result: 20, answer: '+' },
        ],
      },
      {
        id: 7,
        title: 'Теңдеу Шебері',
        type: 'math-sign',
        isBoss: false,
        hint: '6 қиын теңдеу! Ешқайсысын өткізбе!',
        problems: [
          { a: 13, b: 4, result: 17, answer: '+' },
          { a: 19, b: 8, result: 11, answer: '-' },
          { a: 7, b: 6, result: 13, answer: '+' },
          { a: 20, b: 12, result: 8, answer: '-' },
          { a: 5, b: 14, result: 19, answer: '+' },
          { a: 16, b: 9, result: 7, answer: '-' },
        ],
      },
      {
        id: 8,
        title: 'Екі есе — Күрделі',
        type: 'math-double',
        isBoss: false,
        hint: '12-ге дейін екі есе есепте!',
        problems: [
          { base: 7, answer: 14 },
          { base: 8, answer: 16 },
          { base: 9, answer: 18 },
          { base: 11, answer: 22 },
          { base: 12, answer: 24 },
        ],
      },
      {
        id: 9,
        title: 'Жартыға бөлу — Күрделі',
        type: 'math-half',
        isBoss: false,
        hint: '24-ке дейін жартыға бөл!',
        problems: [
          { base: 18, answer: 9 },
          { base: 20, answer: 10 },
          { base: 14, answer: 7 },
          { base: 22, answer: 11 },
          { base: 24, answer: 12 },
        ],
      },
      {
        id: 10,
        title: 'Босс Квест — Есеп Шебері',
        type: 'boss',
        isBoss: true,
        hint: null,
        bossTitle: 'Математика Босс Квесті',
        bossDescription: 'Алдыңғы 9 деңгейден 7 кездейсоқ сұрақ! Көмекші жоқ!',
      },
    ],
  },
  ...EXTRA_MODULES,
];

export function getModule(moduleId) {
  return MODULES.find((m) => m.id === moduleId);
}

export function getLevel(moduleId, levelId) {
  const mod = getModule(moduleId);
  if (!mod) return null;
  return mod.levels.find((l) => l.id === levelId);
}

export function getRegularLevels(moduleId) {
  const mod = getModule(moduleId);
  if (!mod) return [];
  return mod.levels.filter((l) => !l.isBoss);
}

export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickBossQuestions(moduleId, count = 5) {
  const regular = getRegularLevels(moduleId);
  const shuffled = shuffleArray(regular);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
