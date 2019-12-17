import { State, iMapStateToVerbs } from "../model/state";

const stateMap: iMapStateToVerbs = {
  present: "enable",
  disabled: "disable",
  absent: "remove",
};

export default function stateVerb(state: State) {
  return stateMap[state];
}
