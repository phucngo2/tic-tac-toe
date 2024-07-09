import { Component, JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export const Layout: Component<Props> = (props) => {
  return (
    <div class="w-dvw h-dvh flex items-center justify-center">
      {props.children}
    </div>
  );
};
