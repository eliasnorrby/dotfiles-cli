import { mocked } from "ts-jest/utils";
import ConfigLoader from "./configLoader";
import requireFile from "./requireFile";
jest.mock("./requireFile");

describe("ConfigLoader", () => {
  let loader: ConfigLoader;

  beforeEach(() => {
    loader = new ConfigLoader();
  });

  it("should return a config", () => {
    const mockedRequire = mocked(requireFile);
    mockedRequire.mockReturnValueOnce({ setting: "Hello World!" });

    const settings = loader.load();
    expect(settings).toBeDefined();
    expect(settings.setting).toBe("Hello World!");
  });
});
