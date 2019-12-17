import { State, iMapStateToSymbols } from "../model/state";

const stateMap: iMapStateToSymbols = {
  present: "🔹",
  disabled: "🔸",
  absent: "🔺",
};

export default function stateIcon(state: State) {
  return stateMap[state];
}
