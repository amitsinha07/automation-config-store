import { v4 as uuidv4 } from "uuid";

export async function onCancelGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData?.order_id)
    existingPayload.message.order.id = sessionData.order_id;
  return existingPayload;
}
