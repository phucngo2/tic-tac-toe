import { BoardStore } from "@/types";
import { generateNewBoard } from "@/utils";
import { createStore } from "solid-js/store";

export const boardStoreInitialValue: BoardStore = {
  squares: generateNewBoard(),
};

const [boardStore, setBoardStore] = createStore(boardStoreInitialValue);

export { boardStore, setBoardStore };
