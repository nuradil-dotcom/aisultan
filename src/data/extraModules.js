function buildModule(id, title, subtitle, color, icon, prefix, type, bossTitle) {
  const levels = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `${prefix} — ${i + 1}`,
    type,
    isBoss: false,
  }));
  levels.push({
    id: 10,
    title: bossTitle,
    type: 'boss',
    isBoss: true,
    hint: null,
    bossTitle,
    bossDescription: 'Алдыңғы 9 деңгейден 7 кездейсоқ сұрақ! Көмекші жоқ!',
  });
  return { id, title, subtitle, color, icon, levels };
}

export const EXTRA_MODULES = [
  buildModule(
    'memory',
    'Жад Қуаты',
    'Есте сақтау және рет',
    'from-indigo-500 to-blue-600',
    '🧠',
    'Жад',
    'memory',
    'Жад Босс Квесті'
  ),
  buildModule(
    'spatial',
    'Кеңістік Ойлау',
    'Бұру, айна, пішін',
    'from-teal-500 to-emerald-600',
    '🔷',
    'Кеңістік',
    'spatial',
    'Кеңістік Босс Квесті'
  ),
  buildModule(
    'reasoning',
    'Зерек Логика',
    'Артықсызын тап',
    'from-orange-500 to-amber-600',
    '💡',
    'Логика',
    'reasoning',
    'Зерек Босс Квесті'
  ),
  buildModule(
    'deduce',
    'Сырақ Шешу',
    'Ойлап жауап бер',
    'from-fuchsia-500 to-purple-600',
    '🔍',
    'Сырақ',
    'deduce',
    'Сырақ Босс Квесті'
  ),
];
