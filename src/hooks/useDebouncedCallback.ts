import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  fn: T,
  duration: number
): T => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  // @ts-ignore
  return useCallback(
    (...args: any[]) => {
      timerRef.current && clearTimeout(timerRef.current);
      // @ts-ignore
      timerRef.current = setTimeout(() => fn(...args), duration);
    },
    [duration, fn]
  );
};
