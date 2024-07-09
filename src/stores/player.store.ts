import { SQUARE_O, SQUARE_X } from "@/config";
import { createStore } from "solid-js/store";

const [playerStore, setPlayerStore] = createStore({
  squareHuman: SQUARE_X,
  squareComputer: SQUARE_O,
});

export { playerStore, setPlayerStore };
