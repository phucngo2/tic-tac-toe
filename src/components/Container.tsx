import { Component, JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export const Container: Component<Props> = (props) => {
  return (
    <div class="artboard phone-1 bg-neutral card p-6 flex flex-col gap-8 min-w-[320px]">
      {props.children}
    </div>
  );
};
