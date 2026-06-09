import { useState, useCallback, useRef, useEffect } from 'react';

export function useProblemComplete(onAdvance) {
  const [celebration, setCelebration] = useState(null);
  const advanceRef = useRef(onAdvance);

  useEffect(() => {
    advanceRef.current = onAdvance;
  }, [onAdvance]);

  const celebrateAndAdvance = useCallback((tenge = 0) => {
    setCelebration({ tenge });
  }, []);

  const finishCelebration = useCallback(() => {
    setCelebration(null);
    advanceRef.current?.();
  }, []);

  return { celebration, celebrateAndAdvance, finishCelebration };
}
