export const generateId = (): string => {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001).toString();
};

export const updateObjectValue = (
  key: string,
  value: unknown,
  object: unknown
) => {
  return {
    ...(object as object),
    [key]: value,
  };
};
