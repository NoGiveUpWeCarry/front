type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: NodeJS.Timeout;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};
