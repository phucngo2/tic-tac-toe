import { Component } from "solid-js";

interface Props {}

export const Controls: Component<Props> = () => {
  return (
    <div class="flex flex-row items-center justify-center">
      <button class="btn btn-primary">Play again!</button>
    </div>
  );
};
