import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../../classes/mock-action";
import { selectGenerator } from "./generator";
import { SessionData } from "../../../session-types";

export class MockSelectBus201Class extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8")
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
    return "select_BUS_201";
  }
  get description(): string {
    return "Mock for select_BUS_201";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return selectGenerator(existingPayload, sessionData);
  }
  async validate(
    targetPayload: any,
    sessionData: SessionData
  ): Promise<MockOutput> {
    return { valid: true };
  }

  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    // Check for items
    if (!sessionData.items || sessionData.items.length === 0) {
      return {
        valid: false,
        message: "No items available in session data",
        code: "MISSING_ITEMS",
      };
    }
    // Check for provider_id
    if (!sessionData.provider_id) {
      return {
        valid: false,
        message: "No provider_id available in session data",
        code: "MISSING_PROVIDER_ID",
      };
    }

    // All requirements satisfied
    return { valid: true };
  }
}
