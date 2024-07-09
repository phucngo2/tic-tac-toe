export const generate2dArray = (
  numberOfRows: number,
  numberOfCols: number,
  fill: string
) => {
  return Array.from({ length: numberOfRows }, () =>
    Array(numberOfCols).fill(fill)
  );
};
