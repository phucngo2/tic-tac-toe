import { generateNewBoard } from "@/utils";
import { createStore } from "solid-js/store";

const initialValue: string[][] = generateNewBoard(3, 3);

const [boardStore, setBoardStore] = createStore(initialValue);

export { boardStore, setBoardStore };
