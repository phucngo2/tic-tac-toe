import { createSignal } from "solid-js";

export const DEFAULT_TITLE = "Tic Tac Toe";

const [title, setTitle] = createSignal(DEFAULT_TITLE);

export { title, setTitle };
