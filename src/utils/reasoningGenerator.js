import { shuffleArray } from '../data/curriculum';

const CATEGORIES = {
  animals: ['🐱', '🐶', '🐰', '🐻', '🐮', '🐴', '🐧', '🐦'],
  vehicles: ['🚗', '🚕', '🚌', '🚂', '✈️', '🚲'],
  fruits: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍑'],
  shapes: ['🔴', '🔵', '⬜', '🔺', '⭕', '⭐'],
  weather: ['☀️', '🌧️', '❄️', '💨', '⛈️', '🌈'],
  school: ['✏️', '📏', '📐', '📚', '🖍️', '📎'],
  sports: ['⚽', '🏀', '🎾', '🏐', '🏈', '⛳'],
};

const CATEGORY_NAMES = Object.keys(CATEGORIES);

const STATIC_ODD = {
  easy: [
    { items: ['🐱', '🐶', '🐰', '🚗'], answer: '🚗' },
    { items: ['🍎', '🍌', '🍇', '⚽'], answer: '⚽' },
    { items: ['🔴', '🔵', '🟢', '1️⃣'], answer: '1️⃣' },
  ],
  medium: [
    { items: ['🍎', '🍊', '🥕', '🍌'], answer: '🥕' },
    { items: ['🚗', '🚕', '🚌', '🍎'], answer: '🍎' },
    { items: ['1️⃣', '3️⃣', '5️⃣', '4️⃣'], answer: '4️⃣' },
    { items: ['❄️', '🌧️', '💨', '🌳'], answer: '🌳' },
  ],
  hard: [
    { items: ['🅰️', '🅱️', '🅲', '7️⃣'], answer: '7️⃣' },
    { items: ['2️⃣', '4️⃣', '8️⃣', '7️⃣'], answer: '7️⃣' },
    { items: ['✏️', '📏', '📐', '⚽'], answer: '⚽' },
  ],
};

const DEDUCE_TEMPLATES = {
  easy: [
    { story: 'Айсәулет қызыл куртка киді. Болат көк куртка киді. Кім қызыл?', answer: 'Айсәулет', wrong: ['Болат', 'Екеуі де', 'Ешкім'] },
    { story: 'Алма үлкен. Алмұрт кіші. Қайсысы кіші?', answer: 'Алмұрт', wrong: ['Алма', 'Бірдей', 'Екеуі де'] },
    { story: 'Мысық ұйықтайды. Ит ойнайды. Қайсысы ойнайды?', answer: 'Ит', wrong: ['Мысық', 'Екеуі', 'Ешқайсысы'] },
    { story: 'Қызыл доп. Көк доп. Қайсысы көк?', answer: 'Көк доп', wrong: ['Қызыл доп', 'Екеуі', 'Жасыл доп'] },
    { story: 'Алма 5 теңге. Банан 3 теңге. Қайсысы арзан?', answer: 'Банан', wrong: ['Алма', 'Бірдей', 'Екеуі де'] },
    { story: 'Зере биікті. Әлі төмен. Кім биікті?', answer: 'Зере', wrong: ['Әлі', 'Екеуі', 'Ешкім'] },
    { story: 'Аптада 7 күн. Мектепте 5 күн оқимыз. Демалыс неше күн?', answer: '2', wrong: ['3', '5', '7'] },
    { story: 'Таңертең күн шығады. Түнде ай шығады. Таңертең не шығады?', answer: 'Күн', wrong: ['Ай', 'Жұлдыз', 'Бұлт'] },
  ],
  medium: [
    { story: 'Зере 8 жас. Әлі 6 жас. Кім үлкен?', answer: 'Зере', wrong: ['Әлі', 'Бірдей', 'Екеуі де'] },
    { story: 'Алма қызыл. Банан сары. Қайсысы сары?', answer: 'Банан', wrong: ['Алма', 'Екеуі', 'Жасыл'] },
    { story: 'Зере 3 алма жеді. Әлі 2 алма жеді. Барлығы неше алма?', answer: '5', wrong: ['3', '2', '6'] },
    { story: '5 + 2 = 7. 7 - 2 = ?', answer: '5', wrong: ['2', '7', '9'] },
    { story: 'Алма 4 теңге. 2 алма неше теңге?', answer: '8', wrong: ['6', '4', '10'] },
    { story: 'Мысық 4 аяқ жүрмейді — секіреді. Ит неше аяқпен жүреді?', answer: '4', wrong: ['2', '6', '8'] },
    { story: 'Көктемде гүл өседі. Қыс мезгілі — қандай?', answer: 'Қыс', wrong: ['Көктем', 'Жаз', 'Күз'] },
    { story: 'Арман 10-нан 3-ті алды. Неше қалды?', answer: '7', wrong: ['3', '10', '13'] },
  ],
  hard: [
    { story: 'Егер барлық гүлдер өссе, ал роза — гүл. Роза өседі ме?', answer: 'Иә', wrong: ['Жоқ', 'Кейде', 'Белгісіз'] },
    { story: 'Арман 5-ті 3-ке қосты. Нәтиже неше?', answer: '8', wrong: ['7', '9', '6'] },
    { story: 'Көк аспан. Жасыл шөп. Аспан қай түсте?', answer: 'Көк', wrong: ['Жасыл', 'Сары', 'Ақ'] },
    { story: '12-ні 2-ге бөлсек неше шығады?', answer: '6', wrong: ['4', '8', '10'] },
    { story: '3, 6, 9 — келесі сан не?', answer: '12', wrong: ['10', '11', '15'] },
    { story: '4 + 4 = 8. 8 - 4 = ?', answer: '4', wrong: ['8', '0', '6'] },
    { story: '9 + 1 = ?', answer: '10', wrong: ['8', '9', '11'] },
    { story: 'Екі қол, екі аяқ. Барлығы неше?', answer: '4', wrong: ['2', '3', '6'] },
  ],
};

function key(p) {
  return JSON.stringify(p);
}

function pickDecoys(pool, exclude, count) {
  return shuffleArray(pool.filter((x) => !exclude.has(x))).slice(0, count);
}

function generateProceduralOdd(difficulty, seen) {
  const cats = shuffleArray([...CATEGORY_NAMES]);
  const mainCat = cats[0];
  const oddCat = cats[1];
  const mainItems = shuffleArray([...CATEGORIES[mainCat]]).slice(0, 3);
  const oddItem = shuffleArray([...CATEGORIES[oddCat]])[0];
  const items = shuffleArray([...mainItems, oddItem]);
  const answer = oddItem;

  const allEmojis = Object.values(CATEGORIES).flat();
  const exclude = new Set(items);
  const decoys = pickDecoys(allEmojis, exclude, 5);
  const choices = shuffleArray([answer, ...decoys.slice(0, 5)]);

  const problem = { kind: 'odd', items, choices, answer };
  const k = key(problem);
  if (seen.has(k)) return null;
  seen.add(k);
  return problem;
}

function buildOddFromStatic(item, seen) {
  const allEmojis = Object.values(CATEGORIES).flat();
  const exclude = new Set(item.items);
  const decoys = pickDecoys(allEmojis, exclude, 5);
  const choices = shuffleArray([item.answer, ...decoys.slice(0, 5)]);
  const problem = { kind: 'odd', items: item.items, choices, answer: item.answer };
  const k = key(problem);
  if (seen.has(k)) return null;
  seen.add(k);
  return problem;
}

export function generateOddProblem(difficulty, seen = new Set()) {
  for (let i = 0; i < 40; i++) {
    if (Math.random() > 0.35) {
      const p = generateProceduralOdd(difficulty, seen);
      if (p) return p;
    }
    const pool = STATIC_ODD[difficulty] || STATIC_ODD.easy;
    const item = pool[Math.floor(Math.random() * pool.length)];
    const p = buildOddFromStatic(item, seen);
    if (p) return p;
  }
  return generateProceduralOdd(difficulty, new Set()) || buildOddFromStatic(STATIC_ODD.easy[0], new Set());
}

const DEDUCE_DECOYS = ['Ешкім', 'Белгісіз', 'Екеуі де', 'Бірдей', '0', '1', '10', 'Жасыл'];

export function generateDeduceProblem(difficulty, seen = new Set()) {
  const pool = DEDUCE_TEMPLATES[difficulty] || DEDUCE_TEMPLATES.easy;
  for (let i = 0; i < 40; i++) {
    const item = pool[Math.floor(Math.random() * pool.length)];
    const exclude = new Set([item.answer, ...item.wrong]);
    const extra = pickDecoys(DEDUCE_DECOYS, exclude, 3);
    const choices = shuffleArray([item.answer, ...shuffleArray([...item.wrong, ...extra]).slice(0, 5)]);
    const problem = { kind: 'deduce', story: item.story, choices, answer: item.answer };
    const k = key(problem);
    if (!seen.has(k)) {
      seen.add(k);
      return problem;
    }
  }
  const item = pool[0];
  return { kind: 'deduce', story: item.story, choices: shuffleArray([item.answer, ...item.wrong]), answer: item.answer };
}

export function generateReasoningBatch(difficulty, count, seeds = [], kind = 'odd') {
  const seen = new Set(seeds.map(key));
  const result = [...seeds];
  const gen = kind === 'deduce' ? generateDeduceProblem : generateOddProblem;
  let attempts = 0;
  while (result.length < count && attempts < count * 50) {
    attempts++;
    const p = gen(difficulty, seen);
    if (p) result.push(p);
  }
  return shuffleArray(result).slice(0, count);
}
