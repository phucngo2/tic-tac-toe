import { BOARD_COLS, BOARD_ROWS, SQUARE_EMPTY } from "@/config";
import { playerStore } from "@/stores";
import { Move, PlayerValue, Score, SquareValue } from "@/types";
import { hasComputerWon, hasHumanWon, hasWon } from "./result-evaluation";

export function minimax(
  newSquares: SquareValue[][],
  player: PlayerValue,
  alpha: number = Number.MIN_SAFE_INTEGER,
  beta: number = Number.MAX_SAFE_INTEGER
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

  let bestMove: Move | Score = {
    score:
      player === playerStore.computer
        ? Number.MIN_SAFE_INTEGER
        : Number.MAX_SAFE_INTEGER,
  };

  // 2. Go through empty squares on the board
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      if (newSquares[row][col] !== SQUARE_EMPTY) continue;

      newSquares[row][col] = player;

      // 3. Call the minimax function on each available spot (recursion)
      let move = minimax(
        newSquares,
        player === playerStore.computer
          ? playerStore.human
          : playerStore.computer,
        alpha,
        beta
      );

      // Reset the square
      newSquares[row][col] = SQUARE_EMPTY;

      // 4. Find the best move
      if (
        player === playerStore.computer
          ? move.score > bestMove.score
          : move.score < bestMove.score
      ) {
        bestMove = {
          score: move.score,
          row,
          col,
        };
      }

      // 5. Alpha-Beta pruning
      if (player === playerStore.computer) {
        alpha = Math.max(alpha, move.score);
      } else {
        beta = Math.min(beta, move.score);
      }
      if (beta <= alpha) {
        break;
      }
    }
  }

  // 6. Return the best move
  return "row" in bestMove && "col" in bestMove ? bestMove : { score: 0 }; // score 0 means the game is tie!
}
