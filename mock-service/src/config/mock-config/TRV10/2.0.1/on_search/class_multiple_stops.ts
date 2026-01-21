import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../classes/mock-action";
import { SessionData } from "../../session-types";
import { onSearchMultipleStopsGenerator } from "./generator_multiple_stops";

export class MockOnSearchMultipleStopsClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8"),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "on_search";
  }
  get description(): string {
    return "Mock for on_search multiple stops";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onSearchMultipleStopsGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}

export class MockOnSearchMultipleStopsClass2 extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8"),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "on_search_rental_end";
  }
  get description(): string {
    return "Mock for on_search rental end";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onSearchMultipleStopsGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}

export class MockOnSearchMultipleStopsClass3 extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8"),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "on_search_schedule_trip";
  }
  get description(): string {
    return "Mock for on_search multiple stops";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onSearchMultipleStopsGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}

export class MockOnSearchFemaleRideClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./save-data.yaml"), "utf8"),
    ) as saveType;
  }
  get defaultData(): any {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "./default.yaml"), "utf8"),
    );
  }
  get inputs(): any {
    return {};
  }
  name(): string {
    return "on_search";
  }
  get description(): string {
    return "Mock for on_search multiple stops";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onSearchMultipleStopsGenerator(existingPayload, sessionData, true);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    return { valid: true };
  }
}
