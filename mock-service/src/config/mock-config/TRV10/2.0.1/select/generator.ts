import { SessionData } from "../../session-types";

export async function selectMultipleStopsGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  const user_inputs =
    typeof sessionData?.user_inputs?.data === "string"
      ? (() => {
          try {
            return JSON.parse(sessionData.user_inputs.data);
          } catch {
            return {};
          }
        })()
      : sessionData?.user_inputs?.data ?? {};

  existingPayload.message.order.provider.id =
    user_inputs.provider ?? "Provider1";

  existingPayload.message.order.items[0].id =
    user_inputs.item ?? "Item1";

  existingPayload.message.order.fulfillments[0].id =
    user_inputs.fulfillment ?? "Fulfillment1";

  return existingPayload;
}
