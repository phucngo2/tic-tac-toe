import { BOARD_SIZE, SQUARE_EMPTY } from "@/config";
import {
  boardStore,
  DEFAULT_TITLE,
  isPlayable,
  playerStore,
  setBoardStore,
  setIsPlayable,
  setTitle,
} from "@/stores";
import { PlayerValue } from "@/types";
import { deepCopy, generate2dArray } from "./helpers";
import { minimax } from "./minimax";
import { evaluateResult } from "./result-evaluation";

// Generates a new 2D array for the game board
export function generateNewBoard() {
  return generate2dArray(BOARD_SIZE, BOARD_SIZE, SQUARE_EMPTY);
}

// Resets the game board and related state
export function resetBoard() {
  setTitle(DEFAULT_TITLE);
  setBoardStore("squares", generateNewBoard());
  setIsPlayable(true);
}

// Makes a move on the game board
export function move(rowIndex: number, colIndex: number, player: PlayerValue) {
  setBoardStore("squares", rowIndex, colIndex, player);
}

// Initiates human player's move
export function humanPlay(rowIndex: number, colIndex: number) {
  if (!isPlayable()) return;
  if (boardStore.squares[rowIndex][colIndex] !== SQUARE_EMPTY) return;
  move(rowIndex, colIndex, playerStore.human);
}

// Initiates computer player's move using minimax algorithm
export function computerPlay() {
  const clonedSquares = deepCopy(boardStore.squares);
  const bestMove = minimax(clonedSquares, playerStore.computer);
  if (bestMove && "row" in bestMove && "col" in bestMove) {
    move(bestMove.row, bestMove.col, playerStore.computer);
  }
}

// Handles square click event
export function onSquareClick(rowIndex: number, colIndex: number) {
  if (boardStore.squares[rowIndex][colIndex] !== SQUARE_EMPTY) return;
  humanPlay(rowIndex, colIndex);
  computerPlay();
  evaluateResult();
}
