import { SQUARE_EMPTY } from "@/config";
import { boardStoreInitialValue, playerStore, setBoardStore } from "@/stores";

export const generateNewBoard = (
  numberOfRows: number,
  numberOfCols: number
) => {
  return Array.from({ length: numberOfRows }, () =>
    Array(numberOfCols).fill(SQUARE_EMPTY)
  );
};

export const resetBoard = () => {
  setBoardStore(boardStoreInitialValue);
};
export const humanPlay = (rowIndex: number, colIndex: number) => {
  setBoardStore("squares", rowIndex, colIndex, playerStore.squareHuman);
};
export const computerPlay = (rowIndex: number, colIndex: number) => {
  setBoardStore("squares", rowIndex, colIndex, playerStore.squareComputer);
};
export const onSquareClick = (rowIndex: number, colIndex: number) => {
  humanPlay(rowIndex, colIndex);
};
