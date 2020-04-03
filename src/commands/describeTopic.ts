import { highlight } from 'cli-highlight'
import yaml from 'js-yaml'
import { readTopic, readTopicConfig } from '../io'
import Settings from '../settings/iSettings'

export default function describeTopic(
  settings: Settings,
  argv: any,
  topicName: string
) {
  const topic = readTopic(settings, argv, topicName)

  topic.config = readTopicConfig(settings, topicName)
  let yamlStr: string = yaml.safeDump({ [topicName]: topic })

  console.log(highlight(yamlStr, { language: 'yaml', ignoreIllegals: true }))
}
