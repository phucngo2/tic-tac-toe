import { boardStore } from "@/stores/board.store";
import { Component, For } from "solid-js";
import { Square } from "./Square";

interface Props {}

export const Board: Component<Props> = () => {
  return (
    <div class="w-full grid grid-cols-3 gap-3">
      <For each={boardStore}>
        {(row, _) => <For each={row}>{(val) => <Square value={val} />}</For>}
      </For>
    </div>
  );
};
