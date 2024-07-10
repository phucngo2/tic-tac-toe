import { Move, PlayerValue, Score, SquareValue } from "@/types";
import { getEmptySquares, hasWon, isComputerWon, isHumanWon } from "./game";
import { playerStore } from "@/stores";

export function minimax(
  newSquares: SquareValue[][],
  player: PlayerValue
): Score {
  // 1. Return a value if a terminal state is found (+10, 0, -10)

  const emptySquares = getEmptySquares(newSquares);
  const emptySquaresLength = emptySquares.length;

  let wonMark = hasWon();
  if (wonMark) {
    if (isHumanWon(wonMark)) {
      return { score: -10 };
    }
    if (isComputerWon(wonMark)) {
      return { score: 10 };
    }
  }
  if (!emptySquaresLength) return { score: 0 };

  // 2. Go through available spots (emty squares) on the board

  const moves: Move[] = [];
  for (let emptySquare of emptySquares) {
    let currentRow = emptySquare.row;
    let currentCol = emptySquare.col;
    let temp = newSquares[currentRow][currentCol];
    let move: Move = {
      col: currentCol,
      row: currentRow,
      score: 0,
    };
    newSquares[currentRow][currentCol] = player;

    // 3. Call the minimax function on each available spots (recursion)

    if (player == playerStore.computer) {
      let res = minimax(newSquares, playerStore.human);
      move.score = res.score;
    } else {
      let res = minimax(newSquares, playerStore.computer);
      move.score = res.score;
    }

    // Reset the square
    newSquares[currentRow][currentCol] = temp;
    moves.push(move);
  }

  // 4. Evaluate returning values

  let bestMove = moves[0];
  if (player == playerStore.computer) {
    let bestScore = Number.MIN_SAFE_INTEGER;
    for (let move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  } else {
    let bestScore = Number.MAX_SAFE_INTEGER;
    for (let move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  }

  // 5. Return the best value
  return bestMove;
}
