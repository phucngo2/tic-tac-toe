import { resetBoard } from "@/utils";
import { Component } from "solid-js";

interface Props {}

export const Controls: Component<Props> = () => {
  return (
    <div class="flex flex-row items-center justify-center">
      <button
        onClick={resetBoard}
        class="btn btn-primary h-[2.6rem] min-h-[2.6rem]"
      >
        Reset!
      </button>
    </div>
  );
};
