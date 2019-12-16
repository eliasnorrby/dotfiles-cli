export default interface Topic {
  name: string;
  state: "present" | "disabled" | "absent";
  config: "string";
}
