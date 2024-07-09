import { BoardStore } from "@/types";
import { generateNewBoard } from "@/utils";
import { createStore } from "solid-js/store";

export const boardStoreInitialValue: BoardStore = {
  squares: generateNewBoard(3, 3),
};

const [boardStore, setBoardStore] = createStore(boardStoreInitialValue);

export { boardStore, setBoardStore };
