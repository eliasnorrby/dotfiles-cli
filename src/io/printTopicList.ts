import { TopicGroupList } from "../model/topic";
import print from "./print";

export default function printTopicList(topicGroups: TopicGroupList) {
  const groups = Object.keys(topicGroups);

  for (const g of groups) {
    print.group(g);
    for (const t of topicGroups[g]) {
      print.topic(t);
    }
  }
}
