export function problemFingerprint(problem) {
  return JSON.stringify(problem);
}

export function dedupeProblems(problems) {
  const seen = new Set();
  return problems.filter((p) => {
    const k = problemFingerprint(p);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function validatePatternProblem(p) {
  if (!p?.sequence?.length || !p.choices?.includes(p.answer)) return false;
  const unitLen = guessUnitLength(p.sequence);
  if (!unitLen) return true;
  const expected = p.sequence[0];
  for (let i = 0; i < p.sequence.length; i++) {
    const unit = p.sequence.slice(0, unitLen);
    if (p.sequence[i] !== unit[i % unitLen]) return false;
  }
  const expectedAnswer = p.sequence[0];
  const cyclicAnswer = p.sequence[(p.sequence.length) % unitLen];
  // For repeating pattern, answer must continue the cycle
  const correctNext = p.sequence.length > 0
    ? (() => {
        const u = p.sequence.slice(0, unitLen);
        return u[p.sequence.length % unitLen];
      })()
    : null;
  return p.answer === correctNext;
}

function guessUnitLength(sequence) {
  for (let len = 1; len <= Math.min(4, sequence.length); len++) {
    let ok = true;
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] !== sequence[i % len]) { ok = false; break; }
    }
    if (ok) return len;
  }
  return null;
}
