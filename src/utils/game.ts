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
import { checkEqual, deepCopy, generate2dArray } from "./helpers";
import { PlayerValue, SquareCordinate, SquareValue } from "@/types";
import { minimax } from "./minimax";

export function generateNewBoard() {
  return generate2dArray(BOARD_SIZE, BOARD_SIZE, SQUARE_EMPTY);
}

export function resetBoard() {
  setTitle(DEFAULT_TITLE);
  setBoardStore("squares", generateNewBoard());
  setIsPlayable(true);
}

export function hasWon(squares: SquareValue[][]) {
  return checkRowsAndCols(squares) || checkDiagonal(squares);
}

export function getEmptySquares(squares: SquareValue[][]): SquareCordinate[] {
  const emptySquares: SquareCordinate[] = [];

  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      if (squares[i][j] == SQUARE_EMPTY) {
        emptySquares.push({
          row: i,
          col: j,
        });
      }
    }
  }

  return emptySquares;
}

export function isTie() {
  return getEmptySquares(boardStore.squares).length == 0;
}

export function isComputerWon(wonMark: string) {
  return wonMark == playerStore.computer;
}

export function isHumanWon(wonMark: string) {
  return wonMark == playerStore.human;
}

export function evaluateResult() {
  let wonMark = hasWon(boardStore.squares);
  if (wonMark) {
    setIsPlayable(false);
    setTitle(wonMark);
    return true;
  }
  if (isTie()) {
    setIsPlayable(false);
    setTitle(RESULT_TIE);
    return true;
  }
  return false;
}

export function move(rowIndex: number, colIndex: number, player: PlayerValue) {
  setBoardStore("squares", rowIndex, colIndex, player);
}

export function humanPlay(rowIndex: number, colIndex: number) {
  move(rowIndex, colIndex, playerStore.human);
}

export function computerPlay(rowIndex: number, colIndex: number) {
  move(rowIndex, colIndex, playerStore.computer);
}

export function onSquareClick(rowIndex: number, colIndex: number) {
  if (!isPlayable()) {
    return;
  }
  if (boardStore.squares[rowIndex][colIndex] != SQUARE_EMPTY) {
    return;
  }
  humanPlay(rowIndex, colIndex);
  if (evaluateResult()) {
    return;
  }

  let clonedSquares = deepCopy(boardStore.squares);
  let bestMove = minimax(clonedSquares, playerStore.computer);
  if ("row" in bestMove) {
    computerPlay(bestMove.row, bestMove.col);
  }
  evaluateResult();
}

function checkRowsAndCols(squares: SquareValue[][]) {
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

function checkDiagonal(squares: SquareValue[][]) {
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
