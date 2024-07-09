import { SQUARE_EMPTY } from "@/config";
import { playerStore, setBoardStore } from "@/stores";
import { generate2dArray } from "./helpers";

export const generateNewBoard = () => {
  return generate2dArray(3, 3, SQUARE_EMPTY);
};
export const resetBoard = () => {
  setBoardStore("squares", generateNewBoard());
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
