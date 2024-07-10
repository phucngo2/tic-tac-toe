import { createSignal } from "solid-js";

const [isPlayable, setIsPlayable] = createSignal(true);

export { isPlayable, setIsPlayable };
