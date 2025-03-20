/**
 *  debounce, 500ms for network requests
 */
export const debounce = (func: Function, delay: number = 500) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
