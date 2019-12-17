import execa from "execa";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import prettier from "prettier";
import { State } from "../model/state";
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

export function writeConfig(
  settings: Settings,
  topics: TopicGroupList,
  file?: string,
) {
  const { dotfiles, outfile, rootfile } = settings;
  const fileToWrite = file || outfile || rootfile;
  const filePath = path.resolve(dotfiles, fileToWrite);

  try {
    // convert object to yaml
    let yamlStr = yaml.safeDump({ topics });

    // format yaml string
    const formattedYamlStr = prettier.format(yamlStr, { parser: "yaml" });
    // write yaml header
    fs.writeFileSync(filePath, "---\n", "utf8");
    // append topic configuration
    fs.appendFileSync(filePath, formattedYamlStr, "utf8");
  } catch (e) {
    log.error("There was an error writing the config file.");
    console.log(e);
    process.exitCode = 1;
    process.exit();
  }
}

export function runPlaybook(settings: Settings, argv: any) {
  const deployScript = path.resolve(settings.bindir, "run-playbook.zsh");
  const { playbook } = settings;
  const subprocess = execa(deployScript, [playbook]);

  subprocess.stdout?.pipe(process.stdout);
}

export function writeTopicState(
  settings: Settings,
  argv: any,
  topicName: string,
  state: State,
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
