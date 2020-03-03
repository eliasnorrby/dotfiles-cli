import execa from "execa";
import ora from "ora";
import Settings from "../settings/iSettings";
import { log } from "@eliasnorrby/log-util";
import { selectTopics, cleanSelected } from "../io";

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings;
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
  await execa(deployScript, {
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
