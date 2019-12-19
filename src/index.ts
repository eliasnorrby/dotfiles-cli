#!/usr/bin/env node

import os from "os";

import yargs from "yargs";
import { setTopicState, listTopics, runPlaybook } from "./commands";
import Settings from "./settings/iSettings";
import loadSettings from "./settings/loadSettings";
import { log } from "@eliasnorrby/log-util";

// TODO: Fix hardcoded config
const settings: Settings = loadSettings([
  os.homedir() + "/.config/boom/.boomrc.js",
]);

(async () => {
  yargs
    .usage("Usage: $0 [options]")
    .help("h")
    .alias("h", "help")
    .command("list", "list topics", {}, argv => {
      listTopics(settings, argv);
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
    .command(
      "disable <topic>",
      "disable a topic",
      yargs => {
        yargs.positional("topic", {
          describe: "topic to disable",
          type: "string",
        });
      },
      (argv: any) => {
        setTopicState(settings, argv, argv.topic, "disabled");
      },
    )
    .command(
      "remove <topic>",
      "remove a topic",
      yargs => {
        yargs.positional("topic", {
          describe: "topic to remove",
          type: "string",
        });
      },
      (argv: any) => {
        setTopicState(settings, argv, argv.topic, "absent");
      },
    )
    .command("deploy [options]", "deploy configuration", {}, async argv => {
      try {
        log.info("Deploying configuration with ansible...");
        await runPlaybook(settings, argv);
        log.ok("Done! ✨");
      } catch (e) {
        log.fail("An error occured during the playbook run:");
        console.log(e);
        log.fail("Exiting.");
      }
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Run with verbose logging",
    })
    .strict(true).argv;
})();
