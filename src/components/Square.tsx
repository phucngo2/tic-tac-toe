import { Component } from "solid-js";

interface Props {
  value: string;
}

export const Square: Component<Props> = (props) => {
  return <button class="btn aspect-square text-6xl">{props.value}</button>;
};
