import { v4 as uuidv4 } from "uuid";

export async function onStatusGenerator(
  existingPayload: any,
  sessionData: any
) {
  existingPayload.message.order.id = sessionData.order_id;
  return existingPayload;
}
