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

export function writeConfig(
  settings: Settings,
  topics: TopicGroupList,
  file?: string,
) {
  const { dotfiles, outfile, rootfile } = settings;
  const fileToWrite = file || outfile || rootfile;
  const filePath = path.resolve(dotfiles, fileToWrite);

  // convert object to yaml
  let yamlStr = yaml.safeDump({ topics });

  // format yaml string
  const formattedYamlStr = prettier.format(yamlStr, { parser: "yaml" });

  // write yaml header
  try {
    fs.writeFileSync(filePath, "---\n", "utf8");
    fs.appendFileSync(filePath, formattedYamlStr, "utf8");
  } catch (e) {
    log.error("There was an error writing the config file.");
    console.log(e);
    process.exitCode = 1;
    process.exit();
  }

  // append topic configuration
}

export function runPlaybook(settings: Settings, argv: any) {
  const deployScript = path.resolve(settings.bindir, "run-playbook.zsh");
  const { playbook } = settings;
  const subprocess = execa(deployScript, [playbook]);

  subprocess.stdout?.pipe(process.stdout);
}
