"use client";
import { useRef, useEffect, useCallback } from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay: number = 1000,
) {
  const timer = useRef<Timer | null>(null);
  const funcRef = useRef(func);
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = useCallback(
    (...args: Parameters<Func>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  );

  return debouncedFunction;
}
