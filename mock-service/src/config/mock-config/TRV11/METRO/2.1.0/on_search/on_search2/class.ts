import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../../../classes/mock-action";
import { onSearch2Generator} from "./generator";
import { SessionData } from "../../../../session-types";

export class MockOnSearch2Metro210Class extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "../save-data.yaml"), "utf8")
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8")
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "on_search2_METRO_210";
  }
  get description(): string {
    return "Mock for on_search2_METRO_210";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onSearch2Generator(existingPayload, sessionData);
  }
  async validate(
    targetPayload: any,
    sessionData: SessionData
  ): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
  // Check for collected_by
  if (!sessionData.collected_by) {
    return {
      valid: false,
      message: "No collected_by available in session data",
      code: "MISSING_COLLECTED_BY",
    };
  }

  // Check for city_code
  if (!sessionData.city_code) {
    return {
      valid: false,
      message: "No city_code available in session data",
      code: "MISSING_CITY_CODE",
    };
  }

  // All good
  return { valid: true };
}
}
