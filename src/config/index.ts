export const SQUARE_VALUES = {
  Empty: "",
  X: "X",
  O: "O",
} as const;

export const SQUARE_EMPTY = SQUARE_VALUES.Empty;
export const SQUARE_X = SQUARE_VALUES.X;
export const SQUARE_O = SQUARE_VALUES.O;

export const BOARD_SIZE = 3;
export const BOARD_ROWS = BOARD_SIZE;
export const BOARD_COLS = BOARD_SIZE;
export const WIN_CONDITION = BOARD_SIZE;

export const RESULT_TIE = "Tie!!!";
