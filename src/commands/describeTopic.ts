import yaml from "js-yaml";
import Settings from "../settings/iSettings";
import { readTopic, readTopicConfig } from "../io";

export default function describeTopic(
  settings: Settings,
  argv: any,
  topicName: string,
) {
  const topic = readTopic(settings, argv, topicName);

  topic.config = readTopicConfig(settings, topicName);
  let yamlStr: string = yaml.safeDump({ [topicName]: topic });
  console.log(yamlStr);
}
