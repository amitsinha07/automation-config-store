import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { MockAction, MockOutput, saveType } from "../../classes/mock-action";
import { SessionData } from "../../session-types";
import { onUpdateRideUpdatedGenerator } from "./generator_ride_updated";

export class MockOnUpdateRideUpdatedClass extends MockAction {
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
    return "on_update_ride_updated";
  }
  get description(): string {
    return "Mock for on_update ride updated";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return onUpdateRideUpdatedGenerator(existingPayload, sessionData);
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
