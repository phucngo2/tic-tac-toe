import {
  RESULT_COMPUTER_WON,
  RESULT_HUMAN_WON,
  RESULT_TIE,
  SQUARE_O,
  SQUARE_X,
} from "@/config";
import { playerStore, title } from "@/stores";
import { Component, Match, Switch } from "solid-js";

interface Props {}

export const Title: Component<Props> = () => {
  return (
    <h1
      classList={{
        "text-center font-semibold text-3xl mb-6": true,
        "text-info": title() == SQUARE_X,
        "text-error": title() == SQUARE_O,
        "text-warning": title() == RESULT_TIE,
      }}
    >
      <Switch fallback={title()}>
        <Match when={title() == playerStore.computer}>
          {RESULT_COMPUTER_WON}
        </Match>
        <Match when={title() == playerStore.human}>{RESULT_HUMAN_WON}</Match>
      </Switch>
      {}
    </h1>
  );
};
