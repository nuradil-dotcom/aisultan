import { useState, useCallback, useRef } from 'react';

export function useProblemComplete(onAdvance) {
  const [celebration, setCelebration] = useState(null);
  const advanceRef = useRef(onAdvance);

  advanceRef.current = onAdvance;

  const celebrateAndAdvance = useCallback((tenge = 0) => {
    setCelebration({ tenge });
  }, []);

  const finishCelebration = useCallback(() => {
    setCelebration(null);
    advanceRef.current?.();
  }, []);

  return { celebration, celebrateAndAdvance, finishCelebration };
}
