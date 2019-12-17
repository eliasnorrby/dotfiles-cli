import { mocked } from "ts-jest/utils";
import loadConfig from "./loadConfig";
import requireFile from "./requireFile";
jest.mock("./requireFile");

describe("loadConfig", () => {
  it("should return a config", () => {
    const mockedRequire = mocked(requireFile);
    mockedRequire.mockReturnValueOnce({ setting: "Hello World!" });

    const settings = loadConfig(["mock-location"]);
    expect(settings).toBeDefined();
    expect(settings.setting).toBe("Hello World!");
  });
});
