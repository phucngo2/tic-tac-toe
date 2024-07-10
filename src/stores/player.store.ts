import { SQUARE_O, SQUARE_X } from "@/config";
import { createStore } from "solid-js/store";

const [playerStore, setPlayerStore] = createStore({
  human: SQUARE_X,
  computer: SQUARE_O,
});

export { playerStore, setPlayerStore };
