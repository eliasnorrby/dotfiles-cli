#!/usr/bin/env node

import os from "os";

import yargs from "yargs";
import { runPlaybook } from "./io";
import { setTopicState, listTopics } from "./commands";
import Settings from "./settings/iSettings";
import loadSettings from "./settings/loadSettings";
import log from "./utils/log";

// TODO: Fix hardcoded config
const settings: Settings = loadSettings([
  os.homedir() + "/.config/boom/.boomrc.js",
]);

yargs
  .alias("v", "version")
  .usage("Usage: $0 [options]")
  .help("h")
  .alias("h", "help")

  .command("list", "list topics", {}, argv => {
    listTopics(settings, argv);
  })
  .option("new-file", {
    alias: "n",
    type: "boolean",
    description: "List the new config",
  })
  .command(
    "enable <topic>",
    "enable a topic",
    yargs => {
      yargs.positional("topic", {
        describe: "topic to enable",
        type: "string",
      });
    },
    (argv: any) => {
      setTopicState(settings, argv, argv.topic, "present");
    },
  )

  .command("deploy [options]", "deploy configuration", argv => {
    try {
      log.info("Deploying configuration with ansible...");
      console.log("Bin dir: ", settings.bindir);
      runPlaybook(settings, argv);
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
    description: "Run with verbose logging",
  })
  .strict(true);

const argv = yargs.argv;
