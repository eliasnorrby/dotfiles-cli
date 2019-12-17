import requireFile from "./requireFile";

export default function loadSettings(locations: string[]) {
  for (const location of locations) {
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
