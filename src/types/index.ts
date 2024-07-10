import { SQUARE_VALUES } from "@/config";

type SquareKey = keyof typeof SQUARE_VALUES;
export type SquareValue = (typeof SQUARE_VALUES)[SquareKey];

export interface BoardStore {
  squares: SquareValue[][];
}

export interface SquareCordinate {
  row: number;
  col: number;
}
