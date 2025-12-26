import { SessionData } from "../../../../session-types";

export async function onConfirmGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  const randomId = Math.random().toString(36).substring(2, 15);
  existingPayload.message.order.id = randomId;
  return existingPayload;
}
