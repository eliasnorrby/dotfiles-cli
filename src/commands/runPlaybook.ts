import execa from "execa";
import Settings from "../settings/iSettings";

export default function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings;
  execa.sync(deployScript, {
    stdio: "inherit",
    cwd: provisionDir,
    shell: true,
  });
}
