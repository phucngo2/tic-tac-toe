import { SQUARE_O, SQUARE_X } from "@/config";
import { PlayerStore } from "@/types";
import { createStore } from "solid-js/store";

const [playerStore, setPlayerStore] = createStore<PlayerStore>({
  human: SQUARE_X,
  computer: SQUARE_O,
});

export { playerStore, setPlayerStore };
