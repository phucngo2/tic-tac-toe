export const generateNewBoard = (
  numberOfRows: number,
  numberOfCols: number
) => {
  return Array.from({ length: numberOfRows }, () =>
    Array(numberOfCols).fill("O")
  );
};
