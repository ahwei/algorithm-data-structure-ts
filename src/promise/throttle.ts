export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastExecTime = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastExecTime >= delay) {
      fn(args);
      lastExecTime = now;
    }
  };
}

export function throttleTimeout<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (!timeoutId) {
      fn(...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}
