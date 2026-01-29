import { exampleFullfillment } from "../../on_search/fullfillment-generator";

export async function updateEndStopGenerator(
  existingPayload: any,
  sessionData: any,
) {
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
  }
  const fulfillmentId = sessionData.user_inputs?.fulfillment_id
  const rawData = sessionData.user_inputs?.stops;
  const stops =
    typeof rawData === "string" ? JSON.parse(rawData) : rawData;

  existingPayload.message.order.fulfillments = [{
    id: fulfillmentId ?? "Fulfillment1",
    stops: [
      {
        type: "END",
        location: stops?.location ?? {
          descriptor: {
            name: "IFFCO Chowk",
            code: "IFFCO_CHOWK",
          },
          gps: "28.707358, 77.180910",
        },
      },
    ],
  }];

  return existingPayload;
}
