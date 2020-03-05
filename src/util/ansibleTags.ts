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

const flagToTagMap = [
  { tag: "do_homebrew", flag: "homebrew", shortflag: "h" },
  { tag: "do_mas", flag: "apps", shortflag: "a" },
  { tag: "do_packages", flag: "packages", shortflag: "p" },
  { tag: "do_defaults", flag: "defaults", shortflag: "d" },
  { tag: "do_post_provision", flag: "post", shortflag: "pp" },
];
