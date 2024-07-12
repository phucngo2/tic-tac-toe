import {
  onComputerMoveFirstClick,
  onComputerPlayXClick,
  onNewGameClick,
} from "@/utils";
import { Component } from "solid-js";

interface Props {}

export const Controls: Component<Props> = () => {
  return (
    <div class="flex flex-col items-center h-full">
      <label class="cursor-pointer label flex flex-row items-center justify-between gap-1.5 w-full">
        <span class="label-text font-semibold">Computer move first</span>
        <input
          type="checkbox"
          class="toggle toggle-secondary"
          onChange={onComputerMoveFirstClick}
        />
      </label>
      <label class="cursor-pointer label flex flex-row items-center justify-between gap-1.5 w-full">
        <span class="label-text font-semibold">Computer play X</span>
        <input
          type="checkbox"
          class="toggle toggle-accent"
          onChange={onComputerPlayXClick}
        />
      </label>
      <div class="mt-auto flex flex-row items-center justify-between gap-1.5 w-full">
        <span class="font-semibold text-sm text-warning">
          The settings will take effect on new game!
        </span>
        <button
          onClick={onNewGameClick}
          class="btn btn-primary h-[2.6rem] min-h-[2.6rem]"
        >
          New Game!
        </button>
      </div>
    </div>
  );
};
