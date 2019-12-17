export type State = "present" | "absent" | "disabled";

export type iMapStateToSymbols = {
  [K in State]: string;
};

export type iMapStateToVerbs = {
  [K in State]: string;
};
