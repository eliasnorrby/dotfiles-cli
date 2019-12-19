import execa from "execa";
import ora from "ora";
import Settings from "../settings/iSettings";

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings;
  const spinner = ora({
    text: "Running playbook...",
    spinner: "pipe",
    color: "yellow",
  }).start();
  await execa(deployScript, {
    stdio: "inherit",
    cwd: provisionDir,
    shell: true,
  });
  spinner.succeed("Done");
}
