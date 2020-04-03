import Settings from '../settings/iSettings'
import { readConfig } from '../io'
import printTopicList from '../io/printTopicList'

export default function listTopics(settings: Settings, argv: any) {
  const topicGroups = readConfig(settings, argv)
  printTopicList(topicGroups)
}
