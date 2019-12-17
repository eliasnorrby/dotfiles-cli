export type State = "present" | "absent" | "disabled";

export type iMapStateToSymbols = {
  [K in State]: string;
};
