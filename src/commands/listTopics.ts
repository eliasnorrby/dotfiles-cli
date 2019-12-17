import Settings from "../settings/iSettings";
import { readConfig } from "../io";
import print from "../io/print";

export default function listTopics(settings: Settings, argv: any) {
  const topicGroups = readConfig(settings, argv);

  const groups = Object.keys(topicGroups);

  for (const g of groups) {
    print.group(g);
    for (const t of topicGroups[g]) {
      print.topic(t);
    }
  }
}
