import execa from "execa";
import ora from "ora";
import Settings from "../settings/iSettings";
import { log } from "@eliasnorrby/log-util";
import { selectTopics, cleanSelected } from "../io";
import { buildTags } from "../util/ansibleTags";

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings;
  let ansibleTags = buildTags(argv.operations);
  const command =
    deployScript + (ansibleTags ? ` --tags '${ansibleTags}'` : "");
  if (argv.topic) {
    log.info(`Deploying topic(s): ${argv.topic}`);
    selectTopics(settings, argv, argv.topic);
  }
  const spinner = ora({
    text: "Running playbook...",
    spinner: "pipe",
    color: "yellow",
  });
  !argv.verbose && spinner.start();
  await execa.command(command, {
    stdio: argv.verbose ? "inherit" : "pipe",
    cwd: provisionDir,
    shell: true,
  });
  !argv.verbose && spinner.succeed("Done");
  if (argv.topic) {
    log.info("Cleaning up");
    cleanSelected(settings);
  }
}
