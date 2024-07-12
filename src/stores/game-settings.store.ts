import { GameSettings } from "@/types";
import { createStore } from "solid-js/store";

const initialValue: GameSettings = {
  isComputerMoveFirst: false,
  isComputerPlayX: false,
};

const [gameSettings, setGameSettings] = createStore(initialValue);

export { gameSettings, setGameSettings };
