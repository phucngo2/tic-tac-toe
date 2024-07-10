import { Move, PlayerValue, Score, SquareValue } from "@/types";
import { getEmptySquares, hasWon, isComputerWon, isHumanWon } from "./game";
import { playerStore } from "@/stores";

export function minimax(
  newSquares: SquareValue[][],
  player: PlayerValue
): Move | Score {
  // Check for terminal state
  let wonMark = hasWon(newSquares);
  if (wonMark) {
    if (isHumanWon(wonMark)) {
      return { score: -10 };
    }
    if (isComputerWon(wonMark)) {
      return { score: 10 };
    }
  }

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

    // Recursive call
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

  // Find the best move
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

  return bestMove;
}
