#!/usr/bin/env node

import os from "os";

import yargs from "yargs";
import {
  setTopicState,
  listTopics,
  describeTopic,
  runPlaybook,
  runUpdate,
} from "./commands";
import Settings from "./settings/iSettings";
import loadSettings from "./settings/loadSettings";
import { log } from "@eliasnorrby/log-util";
import { describeFlags } from "./util/describeFlags";

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
    .command(
      "describe <topic>",
      "show a topic's configuration",
      yargs => {
        yargs.positional("topic", {
          describe: "topic to describe",
          type: "string",
        });
      },
      (argv: any) => {
        describeTopic(settings, argv, argv.topic);
      },
    )
    .command(
      "update [options]",
      "update zsh, vim, brew, doom",
      {},
      async argv => {
        try {
          log.info("Running update script...");
          await runUpdate(settings, argv);
          log.ok("Done! ✨");
        } catch (e) {
          log.fail("An error occured during the update:");
          console.log(e);
          log.fail("Exiting.");
        }
      },
    )
    .command(
      "deploy [options]",
      "deploy configuration",
      yargs => {
        yargs.option("topic", {
          alias: "t",
          describe: "topic(s) to deploy (comma separated)",
          type: "string",
        });
        yargs.option("operations", {
          alias: "o",
          describe: "operation(s) to perform (comma separated)",
          type: "string"
        });
        yargs.option("list-operations", {
          alias: "l",
          describe: "list available operations",
          type: "boolean"
        });
      },
      async argv => {
        if (argv['list-operations']) {
          log.info("Available operations:")
          describeFlags()
          return
        }
        try {
// TODO: Move the try catch into runPlaybook
          log.info("Deploying configuration with ansible...");
          await runPlaybook(settings, argv);
          log.ok("Done! ✨");
        } catch (e) {
          log.fail("An error occured during the playbook run:");
          console.log(e);
          log.fail("Exiting.");
        }
      },
    )
    .command("settings", "show settings", {}, () => {
      log.info("Current settings:");
      console.log(settings);
    })
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Run with verbose logging",
    })
    .strict(true).argv;
})();
