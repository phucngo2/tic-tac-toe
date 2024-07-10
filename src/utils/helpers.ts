export const generate2dArray = (
  numberOfRows: number,
  numberOfCols: number,
  fill: string
) => {
  return Array.from({ length: numberOfRows }, () =>
    Array(numberOfCols).fill(fill)
  );
};

export const checkEqual = (...args: string[]) => {
  const first = args[0];
  return args.every((val) => !!val && val === first);
};
