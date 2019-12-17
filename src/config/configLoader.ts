import path from "path";

import requireFile from "./requireFile";

const FILE_NAME = ".boomrc.js";
const LOCATIONS = [
  path.resolve(process.env.XDG_CONFIG_HOME || "", "boom", FILE_NAME).toString(),
];

export default class ConfigLoader {
  load() {
    for (const location of LOCATIONS) {
      try {
        // TODO: proceed to check other locations
        const settings = requireFile(location);
        return settings;
      } catch (e) {
        console.error("Could not load settings from ", location);
        console.error(e);
        process.exitCode = 1;
      }
    }
  }
}
