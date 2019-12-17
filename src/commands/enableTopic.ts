import { readConfig, writeConfig } from "../io";
import { Topic, TopicGroupList } from "../model/topic";
import Settings from "../settings/iSettings";
import log from "../utils/log";

export default function enableTopic(
  settings: Settings,
  argv: any,
  topicName: string,
) {
  const topicGroups = readConfig(settings, argv);

  const topic = getTopicFromGroups(topicGroups, topicName);

  if (topic.state === "present") {
    log.skip(`Topic ${topicName} is already enabled!`);
    process.exit();
  }
  topic.state = "present";

  writeConfig(settings, topicGroups);

  log.info(`Topic ${topicName} enabled!`);
}

const getTopicFromGroups = (
  topicGroups: TopicGroupList,
  topicName: string,
): Topic => {
  const [group, name] = topicName.split("/");

  if (!topicGroups[group]) {
    log.error(`Group ${group} does not exist.`);
    process.exit();
  }

  const topicList = topicGroups[group];
  const topic = topicList.filter(t => t.name === name);

  if (topic.length === 0) {
    log.error(`Topic ${name} does not exist in group ${group}.`);
    process.exit();
  }

  return topic[0];
};
