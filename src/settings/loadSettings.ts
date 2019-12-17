import path from "path";

import requireFile from "./requireFile";

export default function loadSettings(locations: string[]) {
  for (const location of locations) {
    try {
      // TODO: proceed to check other locations
      const settings = requireFile(location);
      if (!settings) {
        console.error("Read empty settings from ", location);
        process.exitCode = 1;
      }

      if (!settings.rootfile) {
        settings.rootfile = "root.config.yml";
      }

      if (!settings.clipath) {
        settings.clipath = path.resolve(__dirname, "..", "..");
      }

      if (!settings.bindir) {
        settings.bindir = path.resolve(settings.clipath, "lib", "bin");
      }

      return settings;
    } catch (e) {
      console.error("Could not load settings from ", location);
      console.error(e);
      process.exitCode = 1;
    }
  }
}
