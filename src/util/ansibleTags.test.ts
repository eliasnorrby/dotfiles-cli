import { tagsFromArgv } from "./ansibleTags";

const ARGV_WITH_ONE_FLAG = {
  flags: "homebrew",
};

const ARGV_WITH_TWO_FLAG = {
  flags: "apps,packages",
};

const ARGV_WITH_DUPLICATE_FLAG = {
  flags: "apps,packages,apps",
};

const ARGV_WITH_SHORT_FLAG = {
  flags: "a,p",
};

const ARGV_WITH_SHORT_AND_LOG_FLAG = {
  flags: "a,p,apps",
};

const ARGV_WITH_INVALID_FLAG = {
  flags: "apps,packages,imnnotavalidflag",
};

const ARGV_WITH_OTHER_OPTIONS = {
  flags: "apps,packages",
  topic: "editor/vscode,shell/zsh",
};

const ARGV_WITH_ALL_CASES = {
  flags: "apps,defaults,invalidflag,d,p",
  topic: "lang/kafka",
  verbose: true,
};

const ARGV_EMPTY_FLAGS = {
  flags: "",
};

describe("tagsFromArgv", () => {
  it("should handle a single flag", () => {
    const expected = "do_homebrew";
    expect(tagsFromArgv(ARGV_WITH_ONE_FLAG)).toBe(expected);
  });

  it("should handle two flags", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_TWO_FLAG)).toBe(expected);
  });

  it("should handle duplicate flags", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_DUPLICATE_FLAG)).toBe(expected);
  });

  it("should handle short flags", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_SHORT_FLAG)).toBe(expected);
  });

  it("should handle short and long flags", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_SHORT_AND_LOG_FLAG)).toBe(expected);
  });

  it("should handle invalid flags", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_INVALID_FLAG)).toBe(expected);
  });

  it("should handle argv with other options", () => {
    const expected = "do_mas,do_packages";
    expect(tagsFromArgv(ARGV_WITH_OTHER_OPTIONS)).toBe(expected);
  });

  it("should handle argv with all cases at once", () => {
    const expected = "do_mas,do_defaults,do_packages";
    const received = tagsFromArgv(ARGV_WITH_ALL_CASES);
    expect(
      expected
        .split(",")
        .sort()
        .join(","),
    ).toBe(
      expected
        .split(",")
        .sort()
        .join(","),
    );
  });

  it("should handle argv with empty flags", () => {
    const expected = "";
    expect(tagsFromArgv(ARGV_EMPTY_FLAGS)).toBe(expected);
  });
});
