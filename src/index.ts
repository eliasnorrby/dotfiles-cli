#!/usr/bin/env node

import path from "path";
import fs from "fs";
import child_process from "child_process";

import yargs from "yargs";
import yaml from "js-yaml";
import prettier from "prettier";

import TopicGroupList from "./model/TopicGroupList";
import Topic from "./model/Topic";

import log from "./log";

const DOTFILES_DIR = process.env.DOTFILES || path.resolve(__dirname, "..");
// console.log("Dotfiles dir: ", DOTFILES_DIR);
const BIN_DIR = path.resolve(__dirname, "..", "bin");
// console.log("Bin dir: ", BIN_DIR);

const stateMap = {
  present: "🔹",
  disabled: "🔸",
  absent: "🔺"
};

const readRootConfig = (argv: any) => {
  try {
    const fileContents = fs.readFileSync(
      path.resolve(DOTFILES_DIR, argv.n ? "new.config.yml" : "root.config.yml"),
      "utf8"
    );
    const data: { topics: TopicGroupList } = yaml.safeLoad(fileContents);

    if (data.topics === undefined) {
      log.error("Could not read config, exiting.");
      process.exit();
    }
    return data.topics;
  } catch (e) {
    log.error("There was an error reading the config file.");
    console.log(e);
    process.exit();
  }
};

const writeNewConfig = (topics: TopicGroupList) => {
  const OUTPUT_FILE = path.resolve(DOTFILES_DIR, "new.config.yml");
  // convert object to yaml
  let yamlStr = yaml.safeDump({ topics });

  // format yaml string
  const formattedYamlStr = prettier.format(yamlStr, { parser: "yaml" });

  // write yaml header
  fs.writeFileSync(OUTPUT_FILE, "---\n", "utf8");

  // append topic configuration
  fs.appendFileSync(OUTPUT_FILE, formattedYamlStr, "utf8");
};

const listTopics = (argv: any) => {
  const topicGroups = readRootConfig(argv);

  const groups = Object.keys(topicGroups);

  for (const g of groups) {
    console.log(`==== ${g} ====`);
    for (const t of topicGroups[g]) {
      const { state, name } = t;
      console.log(`${stateMap[state]} : ${name}`);
    }
  }
};

const enableTopic = (topicName: string, argv: any) => {
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

  const topicGroups = readRootConfig(argv);

  const topic = validateTopic(topicName);

  if (topic.state === "present") {
    log.skip(`Topic ${topicName} is already enabled!`);
    process.exit();
  }
  topic.state = "present";

  writeNewConfig(topicGroups);

  log.info(`Topic ${topicName} enabled!`);
};

const runPlaybook = () => {
  child_process.execSync(path.resolve(BIN_DIR, "run-playbook.zsh"), {
    stdio: "inherit"
  });
};

// writeNewConfig(topics);

yargs
  .alias("v", "version")
  .usage("Usage: $0 [options]")
  .help("h")
  .alias("h", "help")

  .command("list", "list topics", {}, argv => {
    listTopics(argv);
  })
  .option("new-file", {
    alias: "n",
    type: "boolean",
    description: "List the new config"
  })
  .command(
    "enable <topic>",
    "enable a topic",
    yargs => {
      yargs.positional("topic", {
        describe: "topic to enable",
        type: "string"
      });
    },
    (argv: any) => {
      enableTopic(argv.topic, argv);
    }
  )

  .command("deploy [options]", "deploy configuration", argv => {
    try {
      log.info("Deploying configuration with ansible...");
      console.log("Bin dir: ", BIN_DIR);
      runPlaybook();
      log.info("Done! ✨");
    } catch (e) {
      log.error("An error occured during the playbook run:");
      console.log(e);
      log.error("Exiting.");
    }
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging"
  })
  .strict(true);

const argv = yargs.argv;
