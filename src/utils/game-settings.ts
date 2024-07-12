import { gameSettings, setGameSettings, setPlayerStore } from "@/stores";
import { JSX } from "solid-js/jsx-runtime";
import { computerPlay, resetBoard } from "./game";
import { SQUARE_O, SQUARE_X } from "@/config";

export const onNewGameClick = () => {
  resetBoard();
  // Computer play X
  if (gameSettings.isComputerPlayX) {
    setPlayerStore("computer", SQUARE_X);
    setPlayerStore("human", SQUARE_O);
  } else {
    setPlayerStore("computer", SQUARE_O);
    setPlayerStore("human", SQUARE_X);
  }
  // Computer move first
  if (gameSettings.isComputerMoveFirst) {
    computerPlay();
  }
};

export const onComputerPlayXClick: JSX.EventHandler<HTMLInputElement, Event> = (
  event
) => {
  let checked = (event.target as HTMLInputElement).checked;
  setGameSettings("isComputerPlayX", checked);
};

export const onComputerMoveFirstClick: JSX.EventHandler<
  HTMLInputElement,
  Event
> = (event) => {
  let checked = (event.target as HTMLInputElement).checked;
  setGameSettings("isComputerMoveFirst", checked);
};
