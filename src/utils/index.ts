export const generateId = (): string => {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001).toString();
};