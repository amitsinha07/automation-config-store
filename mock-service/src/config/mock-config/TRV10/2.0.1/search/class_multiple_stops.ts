import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../classes/mock-action";
import { SessionData } from "../../session-types";
import { searchMultipleStopsGenerator } from "./generator_multiple_stops";

export class MockSearchMultipleStopsClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(
        path.resolve(__dirname, "./default_multiple_stops.yaml"),
        "utf8",
      ),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "search";
  }
  get description(): string {
    return "Mock for search multiple stops";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return searchMultipleStopsGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}

export class MockSearchFemaleRideClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(
        path.resolve(__dirname, "./default_multiple_stops.yaml"),
        "utf8",
      ),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "search_ride_female";
  }
  get description(): string {
    return "Mock for search multiple stops";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return searchMultipleStopsGenerator(existingPayload, sessionData, true);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}
