const colors: string[] = [];

export const getAll = (): string[] => [...colors];

export const save = (color: string): string => {
  colors.push(color);
  return color;
};