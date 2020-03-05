import { flagToTagMap } from "../constants/flagToTagMap"

type Argv = {
  flags: string;
};

export const tagsFromArgv = (argv: Argv) => {
  if (!argv.flags) {
    return "";
  }

  const flags = argv.flags.split(",");

  const ansibleTags = flagToTagMap
    .filter(
      entry => flags.includes(entry.flag) || flags.includes(entry.shortflag),
    )
    .map(entry => entry.tag)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(",");

  return ansibleTags;
};
