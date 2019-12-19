import execa from "execa";
import ora from "ora";
import Settings from "../settings/iSettings";

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings;
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
}
