import { SQUARE_O, SQUARE_X } from "@/config";
import { onSquareClick } from "@/utils";
import { Accessor, Component } from "solid-js";

interface Props {
  value: string;
  rowIndex: Accessor<number>;
  colIndex: Accessor<number>;
}

export const Square: Component<Props> = (props) => {
  return (
    <button
      onClick={() => onSquareClick(props.rowIndex(), props.colIndex())}
      classList={{
        "btn aspect-square text-6xl square": true,
        "text-info": props.value == SQUARE_X,
        "text-error": props.value == SQUARE_O,
      }}
    >
      {props.value}
    </button>
  );
};
