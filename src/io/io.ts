import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import prettier from "prettier";
import { State } from "../model/state";
import { Topic, TopicGroupList } from "../model/topic";
import Settings from "../settings/iSettings";
import { log } from "@eliasnorrby/log-util";
import stateVerb from "./stateVerb";
import stateIcon from "./stateIcon";

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
      log.fail("Could not read config, exiting.");
      process.exit(1);
    }
    return data.topics;
  } catch (e) {
    log.fail("There was an error reading the config file.");
    console.log(e);
    process.exit(1);
  }
}

export function readTopicConfig(settings: Settings, topicName: string) {
  const { dotfiles } = settings;
  const fileToRead = path.resolve(dotfiles, topicName, "topic.config.yml");
  const shortName = topicName.split("/")[1];
  const fieldName = shortName + "_config";
  try {
    const fileContents = fs.readFileSync(fileToRead, "utf8");
    const data = yaml.safeLoad(fileContents);
    if (data[fieldName] === undefined) {
      log.fail(`Could not read config for topic ${topicName}, exiting.`);
      process.exit(1);
    }
    return data[fieldName];
  } catch (e) {
    log.fail("There was an error reading the config file.");
    console.log(e);
    process.exit(1);
  }
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
    log.fail("There was an error writing the config file.");
    console.log(e);
    process.exit(1);
  }
}

export function writeTopicState(
  settings: Settings,
  argv: any,
  topicName: string,
  state: State,
) {
  const topicGroups = readConfig(settings, argv);
  const topic = getTopicFromGroups(topicGroups, topicName);

  if (topic.state === state) {
    log.skip(`Topic ${topicName} is already ${stateVerb(state)}d!`);
    process.exit();
  }
  topic.state = state;

  writeConfig(settings, topicGroups);

  console.log(`${stateIcon(state)} Topic ${topicName} ${stateVerb(state)}d!`);
}

export function selectTopics(
  settings: Settings,
  argv: any,
  topicNames: string,
) {
  const nameList = topicNames.split(",");
  log.info(`Selecting ${nameList.length} topics for deployment`);
  const temporaryRootConfig: TopicGroupList = {};

  for (const name of nameList) {
    const topic = readTopic(settings, argv, name);
    const group = splitGroupAndName(name)[0];
    if (!temporaryRootConfig[group]) temporaryRootConfig[group] = [];

    temporaryRootConfig[group].push(topic);
  }

  try {
    let yamlStr = yaml.safeDump({ topics: temporaryRootConfig });
    // format yaml string
    const formattedYamlStr = prettier.format(yamlStr, { parser: "yaml" });
    log.info("Writing temporary config:");
    console.log(formattedYamlStr);
    writeConfig(settings, temporaryRootConfig, settings.localfile);
  } catch (err) {
    log.fail("Error writing temporary config.");
    console.log(err);
  }
}

export function cleanSelected(settings: Settings) {
  const { dotfiles, localfile } = settings;
  const filePathToRemove = path.resolve(dotfiles, localfile);
  log.info(`Removing ${filePathToRemove}`);
  fs.unlinkSync(filePathToRemove);
}

export function readTopic(settings: Settings, argv: any, topicName: string) {
  const topicGroups = readConfig(settings, argv);
  return getTopicFromGroups(topicGroups, topicName);
}

const splitGroupAndName = (topicName: string) => topicName.split("/");

const getTopicFromGroups = (
  topicGroups: TopicGroupList,
  topicName: string,
): Topic => {
  const [group, name] = splitGroupAndName(topicName);

  if (!topicGroups[group]) {
    log.fail(`Group ${group} does not exist.`);
    process.exit();
  }

  const topicList = topicGroups[group];
  const topic = topicList.filter(t => t.name === name);

  if (topic.length === 0) {
    log.fail(`Topic ${name} does not exist in group ${group}.`);
    process.exit();
  }

  return topic[0];
};
