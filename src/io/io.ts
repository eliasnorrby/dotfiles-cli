import path from "path";
import fs from "fs";

import yaml from "js-yaml";
import prettier from "prettier";
import execa from "execa";

import { Topic, TopicGroupList } from "../model/topic";
import Settings from "../settings/iSettings";

import log from "../utils/log";

export function readConfig(settings: Settings, argv: any, file?: string) {
  const { dotfiles, rootfile } = settings;
  const fileToRead = file || rootfile;
  try {
    const fileContents = fs.readFileSync(
      path.resolve(dotfiles, fileToRead),
      "utf8",
    );
    const data: { topics: TopicGroupList } = yaml.safeLoad(fileContents);

    if (data.topics === undefined) {
      log.error("Could not read config, exiting.");
      process.exitCode = 1;
      process.exit();
    }
    return data.topics;
  } catch (e) {
    log.error("There was an error reading the config file.");
    console.log(e);
    process.exitCode = 1;
    process.exit();
  }
}

export function readTopicConfig(settings: Settings, topicName: string) {
  log.info("Not implemented yet :)");
}

export function writeConfig(settings: Settings, topics: TopicGroupList) {
  const OUTPUT_FILE = settings.outfile || settings.rootfile;
  // convert object to yaml
  let yamlStr = yaml.safeDump({ topics });

  // format yaml string
  const formattedYamlStr = prettier.format(yamlStr, { parser: "yaml" });

  // write yaml header
  fs.writeFileSync(OUTPUT_FILE, "---\n", "utf8");

  // append topic configuration
  fs.appendFileSync(OUTPUT_FILE, formattedYamlStr, "utf8");
}

export function enableTopic(settings: Settings, argv: any, topicName: string) {
  const validateTopic = (topicName: string): Topic => {
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

  const topicGroups = readConfig(settings, argv);

  const topic = validateTopic(topicName);

  if (topic.state === "present") {
    log.skip(`Topic ${topicName} is already enabled!`);
    process.exit();
  }
  topic.state = "present";

  writeConfig(settings, topicGroups);

  log.info(`Topic ${topicName} enabled!`);
}

export function runPlaybook(settings: Settings, argv: any) {
  const deployScript = path.resolve(settings.bindir, "run-playbook.zsh");
  const { playbook } = settings;
  const subprocess = execa(deployScript, [playbook]);

  subprocess.stdout?.pipe(process.stdout);
}
