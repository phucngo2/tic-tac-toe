import {
  BOARD_COLS,
  BOARD_ROWS,
  BOARD_SIZE,
  RESULT_TIE,
  SQUARE_EMPTY,
  WIN_CONDITION,
} from "@/config";
import {
  boardStore,
  DEFAULT_TITLE,
  isPlayable,
  playerStore,
  setBoardStore,
  setIsPlayable,
  setTitle,
} from "@/stores";
import { checkEqual, generate2dArray } from "./helpers";

export function generateNewBoard() {
  return generate2dArray(BOARD_SIZE, BOARD_SIZE, SQUARE_EMPTY);
}

export function resetBoard() {
  setTitle(DEFAULT_TITLE);
  setBoardStore("squares", generateNewBoard());
  setIsPlayable(true);
}

export function hasWon() {
  const squares = boardStore.squares;
  return checkRowsAndCols(squares) || checkDiagonal(squares);
}

export function isTie() {
  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      if (boardStore.squares[i][j] == SQUARE_EMPTY) {
        return false;
      }
    }
  }
  return true;
}

export function evaluateResult() {
  if (isTie()) {
    setIsPlayable(false);
    setTitle(RESULT_TIE);
    return;
  }
  let won_mark = hasWon();
  if (won_mark) {
    setIsPlayable(false);
    setTitle(won_mark);
    return;
  }
}

export function humanPlay(rowIndex: number, colIndex: number) {
  setBoardStore("squares", rowIndex, colIndex, playerStore.squareHuman);
}

export function computerPlay(rowIndex: number, colIndex: number) {
  setBoardStore("squares", rowIndex, colIndex, playerStore.squareComputer);
}

export function onSquareClick(rowIndex: number, colIndex: number) {
  if (!isPlayable()) {
    return;
  }
  if (boardStore.squares[rowIndex][colIndex] != SQUARE_EMPTY) {
    return;
  }
  humanPlay(rowIndex, colIndex);
  evaluateResult();
}

function checkRowsAndCols(squares: string[][]) {
  for (let i = 0; i < WIN_CONDITION; i++) {
    // Check rows
    if (checkEqual(...squares[i])) {
      return squares[i][0];
    }
    // Check columns
    const columnValues = [];
    for (let j = 0; j < WIN_CONDITION; j++) {
      columnValues.push(squares[j][i]);
    }
    if (checkEqual(...columnValues)) {
      return columnValues[0];
    }
  }
  return null;
}

function checkDiagonal(squares: string[][]) {
  const diagonalValues = [];
  const antiDiagonalValues = [];
  for (let i = 0; i < WIN_CONDITION; i++) {
    diagonalValues.push(squares[i][i]);
    antiDiagonalValues.push(squares[i][WIN_CONDITION - 1 - i]);
  }
  if (checkEqual(...diagonalValues)) {
    return diagonalValues[0];
  }
  if (checkEqual(...antiDiagonalValues)) {
    return antiDiagonalValues[0];
  }
  return null;
}
