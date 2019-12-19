import fs from "fs";
import Settings from "../settings/iSettings";
import { defaultSettings } from "./defaultSettings";

import requireFile from "./requireFile";

export default function loadSettings(locations: string[]): Settings {
  let settings: Settings = defaultSettings;
  for (const location of locations) {
    try {
      if (fs.existsSync(location)) {
        const readSettings = requireFile(location);
        // console.log("Read settings from ", location);
        settings = { ...settings, ...readSettings };
        break;
      } else {
        // console.error("Found no settings at ", location);
      }
    } catch (e) {
      console.error("Could not load settings from ", location);
      console.error(e);
    }
  }
  return settings;
}
