import { Move, PlayerValue, Score, SquareValue } from "@/types";
import {
  getEmptySquares,
  hasWon,
  hasComputerWon,
  hasHumanWon,
} from "./result-evaluation";
import { playerStore } from "@/stores";

export function minimax(
  newSquares: SquareValue[][],
  player: PlayerValue
): Move | Score {
  // 1. Return a value if a terminal state is found (+10, 0, -10)
  let wonMark = hasWon(newSquares);
  if (wonMark) {
    if (hasHumanWon(wonMark)) {
      return { score: -420 };
    }
    if (hasComputerWon(wonMark)) {
      return { score: 420 };
    }
  }

  // 2. Go through empty squares on the board

  const emptySquares = getEmptySquares(newSquares);
  const emptySquaresLength = emptySquares.length;
  if (emptySquaresLength === 0) {
    return { score: 0 };
  }

  // Array to store all possible moves
  const moves: Move[] = [];

  for (let emptySquare of emptySquares) {
    let currentRow = emptySquare.row;
    let currentCol = emptySquare.col;

    let move: Move = {
      row: currentRow,
      col: currentCol,
      score: 0,
    };

    let temp = newSquares[currentRow][currentCol];
    newSquares[currentRow][currentCol] = player;

    // 3. Call the minimax function on each available spot (recursion)
    let res = minimax(
      newSquares,
      player === playerStore.computer ? playerStore.human : playerStore.computer
    );
    move.score = res.score;

    // Reset the square
    newSquares[currentRow][currentCol] = temp;

    // Push the move to the moves array
    moves.push(move);
  }

  // 4. Find the best move
  let bestMove: Move = moves[0];
  let bestScore =
    player === playerStore.computer
      ? Number.MIN_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;

  for (let move of moves) {
    if (player === playerStore.computer) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    } else {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }

  // 5. Return the best move
  return bestMove;
}
