import { SessionData } from "../../../session-types";

export async function onConfirmDriverNotFound(
  existingPayload: any,
  sessionData: SessionData,
) {
  delete existingPayload.message;
  existingPayload.error = {
    code: "90203",
    message: "Driver not assigned to the order",
  };
  return existingPayload;
}
