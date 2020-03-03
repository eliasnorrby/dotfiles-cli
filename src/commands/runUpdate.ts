import execa from "execa";
import ora from "ora";
import { Color } from "ora";
import Settings from "../settings/iSettings";

export default async function runUpdate(settings: Settings, argv: any) {
  const { provisionDir, updateScript } = settings;

  const subprocess = execa(updateScript, {
    stdio: argv.verbose ? "inherit" : "pipe",
    cwd: provisionDir,
    shell: true,
  });

  if (argv.verbose) {
    await subprocess;
  } else {
    const spinner = coloredSpinner("Updating...");
    spinner.start();

    await subprocess;

    spinner.stop();
  }
}

const coloredSpinner = (text: string) => {
  const colors: Color[] = [
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "gray",
  ];
  const spinner = ora({
    text,
    spinner: "growVertical",
    color: colors[0],
  });
  let idx = 1;

  let interval: NodeJS.Timeout;

  const start = () => {
    spinner.start();
    interval = setInterval(() => {
      spinner.color = colors[idx];
      idx = (idx + 1) % colors.length;
    }, 10.1 * 120);
  };

  const stop = () => {
    spinner.succeed("Done!");
    clearInterval(interval);
  };

  return { start, stop };
};
