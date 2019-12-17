import { mocked } from "ts-jest/utils";
import loadSettings from "./loadSettings";
import requireFile from "./requireFile";
jest.mock("./requireFile");

describe("loadSettings", () => {
  it("should return a config", () => {
    const mockedRequire = mocked(requireFile);
    mockedRequire.mockReturnValueOnce({ setting: "Hello World!" });

    const settings = loadSettings(["mock-location"]);
    expect(settings).toBeDefined();
    expect(settings.setting).toBe("Hello World!");
  });
});
