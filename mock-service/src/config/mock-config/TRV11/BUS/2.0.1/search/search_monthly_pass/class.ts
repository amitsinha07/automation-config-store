import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../../../classes/mock-action";
import { SessionData } from "../../../../session-types";
import { searchMonthlyPassGenerator } from "./generator";

export class MockSearchMonthlyPassBus201Class extends MockAction {
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
    return "search_monthly_pass_BUS_201";
  }
  get description(): string {
    return "Mock for search_BUS_201";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return searchMonthlyPassGenerator(existingPayload, sessionData);
  }
  async validate(
    targetPayload: any,
    sessionData: SessionData
  ): Promise<MockOutput> {
    
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}
