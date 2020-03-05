import { flagToTagMap } from "../constants/flagToTagMap"

export const tagsFromFlags = (flagString: string) => {
  if (!flagString || flagString === "") {
    return "";
  }

  const flags = flagString.split(",");

  const ansibleTags = flagToTagMap
    .filter(
      entry => flags.includes(entry.flag) || flags.includes(entry.shortflag),
    )
    .map(entry => entry.tag)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(",");

  return ansibleTags;
};
