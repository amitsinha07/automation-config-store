import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../classes/mock-action";
import { SessionData } from "../../session-types";
import { searchMultipleStopsScheduleTripGenerator } from "./generator-schedule-trip";

export class MockSearchScheduleTripClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(
        path.resolve(__dirname, "./default_schedule_trip.yaml"),
        "utf8",
      ),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "search_schedule_trip";
  }
  get description(): string {
    return "Mock for search schedule trip";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return searchMultipleStopsScheduleTripGenerator(
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
