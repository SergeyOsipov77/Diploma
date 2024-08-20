export const randomizeInteger = (min: number, max: number): string => {
  return min + Math.floor((max - min + 1) * Math.random()) + '';
};