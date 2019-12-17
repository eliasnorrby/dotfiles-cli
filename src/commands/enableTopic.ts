import { writeTopicState } from "../io";
import { State } from "../model/state";
import Settings from "../settings/iSettings";

export default function enableTopic(
  settings: Settings,
  argv: any,
  topicName: string,
) {
  const state: State = "present";
  writeTopicState(settings, argv, topicName, state);
}
