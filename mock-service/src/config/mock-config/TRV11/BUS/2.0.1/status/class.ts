import { readFileSync } from "fs";
import yaml from "js-yaml";
import path from "path";
import { statusPurchaseFlowGenerator } from "./generator";
import { SessionData } from "config/mock-config/TRV11/session-types";
import { MockAction, MockOutput, saveType } from "config/mock-config/TRV11/classes/mock-action";


export class MockStatusPurchaseFlowBus201Class extends MockAction {
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
    return "status_purchase_flow_BUS_201";
  }
  get description(): string {
    return "Mock for status_BUS_201";
  }
  generator(existingPayload: any, sessionData: SessionData): Promise<any> {
    return statusPurchaseFlowGenerator(existingPayload, sessionData);
  }
  async validate(
  targetPayload: any,
  sessionData: SessionData
): Promise<MockOutput> {
  const payloadOrderId = targetPayload?.message?.order_id;
  const sessionOrderId = sessionData?.order_id;

  if (payloadOrderId !== sessionOrderId) {
    return {
      valid: false,
      message: `Order ID mismatch. Expected ${sessionOrderId}, got ${payloadOrderId}`,
    };
  }
  return { valid: true };
}
  async meetRequirements(sessionData: SessionData): Promise<MockOutput> {
  // Check for transaction_id
  if (!sessionData.transaction_id) {
    return {
      valid: false,
      message: "No transaction_id available in session data",
      code: "MISSING_TRANSACTION_ID",
    };
  }

  // All requirements satisfied
  return { valid: true };
}
}
