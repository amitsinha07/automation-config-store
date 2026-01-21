import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../../classes/mock-action";
import { SessionData } from "../../../session-types";
import { onCancelSoftGenerator } from "./generator_soft_cancel";

export class MockOnCancelSoftClass extends MockAction {
  get saveData(): saveType {
    return yaml.load(
      readFileSync(path.resolve(__dirname, "../save-data.yaml"), "utf8"),
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
    return "on_cancel_ride_cancel";
  }
  get description(): string {
    return "Mock for on_cancel soft";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onCancelSoftGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    if (!sessionData.order_id) {
      return { valid: false, message: "No order_id available in session data" };
    }
    return { valid: true };
  }
}

export class MockOnCancelSoftClass2 extends MockAction {
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
    return "on_cancel";
  }
  get description(): string {
    return "Mock for on_cancel";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onCancelSoftGenerator(existingPayload, sessionData);
  }
  async validate(targetPayload: any): Promise<MockOutput> {
    return { valid: true };
  }
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
    if (!sessionData.order_id) {
      return { valid: false, message: "No order_id available in session data" };
    }
    return { valid: true };
  }
}
