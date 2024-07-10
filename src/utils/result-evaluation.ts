import {
  BOARD_COLS,
  BOARD_ROWS,
  RESULT_TIE,
  SQUARE_EMPTY,
  WIN_CONDITION,
} from "@/config";
import { boardStore, playerStore, setIsPlayable, setTitle } from "@/stores";
import { SquareCordinate, SquareValue } from "@/types";
import { checkEqual } from "./helpers";

// Returns an array of empty squares on the board
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

// Determines if the computer has won
export function hasComputerWon(wonMark: string) {
  return wonMark == playerStore.computer;
}

// Determines if the human has won
export function hasHumanWon(wonMark: string) {
  return wonMark == playerStore.human;
}

// Determines if the game is a tie
export function isTie(): boolean {
  return getEmptySquares(boardStore.squares).length === 0;
}

// Evaluates the game result and updates game state accordingly
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

// Determines if there's a winner by checking rows, columns, and diagonals
export function hasWon(squares: SquareValue[][]) {
  return checkRowsAndCols(squares) || checkDiagonal(squares);
}

// Checks if a player has won by checking rows and columns
function checkRowsAndCols(squares: SquareValue[][]): SquareValue | null {
  for (let i = 0; i < WIN_CONDITION; i++) {
    // Check rows
    if (checkEqual(...squares[i])) {
      return squares[i][0];
    }
    // Check columns
    const columnValues: SquareValue[] = [];
    for (let j = 0; j < WIN_CONDITION; j++) {
      columnValues.push(squares[j][i]);
    }
    if (checkEqual(...columnValues)) {
      return columnValues[0];
    }
  }
  return null;
}

// Checks if a player has won by checking diagonals
function checkDiagonal(squares: SquareValue[][]): SquareValue | null {
  const diagonalValues: SquareValue[] = [];
  const antiDiagonalValues: SquareValue[] = [];
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
