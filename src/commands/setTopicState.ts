import { writeTopicState } from "../io";
import { State } from "../model/state";
import Settings from "../settings/iSettings";

export default function setTopicState(
  settings: Settings,
  argv: any,
  topicName: string,
  state: State,
) {
  writeTopicState(settings, argv, topicName, state);
}
