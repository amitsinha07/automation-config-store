import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../classes/mock-action";
import { SessionData } from "../../session-types";
import { searchMultipleStopsScheduleRentalGenerator } from "./generator-schedule-rental";

export class MockSearchScheduleRentalClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(
        path.resolve(__dirname, "./default_schedule_rental.yaml"),
        "utf8",
      ),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "search_schedule_rental";
  }
  get description(): string {
    return "Mock for search schedule rental";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return searchMultipleStopsScheduleRentalGenerator(
      existingPayload,
      sessionData,
    );
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}
