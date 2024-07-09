import { boardStore } from "@/stores";
import { Component, For } from "solid-js";
import { Square } from "./Square";

interface Props {}

export const Board: Component<Props> = () => {
  return (
    <div class="w-full grid grid-cols-3 gap-3">
      <For each={boardStore.squares}>
        {(row, rowIndex) => (
          <For each={row}>
            {(val, colIndex) => (
              <Square value={val} rowIndex={rowIndex} colIndex={colIndex} />
            )}
          </For>
        )}
      </For>
    </div>
  );
};
