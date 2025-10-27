import { SessionData } from "../../../../session-types";

export async function selectGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  existingPayload.context.location.city.code = sessionData.city_code;

  existingPayload.message.order.fulfillments = [sessionData.fulfillment].map(
    (f: any) => ({
      id: f.id,
      stops: f.stops,
    })
  );

  existingPayload.message.order.items = [
    {
      id: sessionData.item_ids[0],
      quantity: {
        selected: {
          count: sessionData?.user_inputs?.seat_count || 1,
        },
      },
    },
  ];

  existingPayload.message.order.provider = { id: sessionData.provider_id };

  return existingPayload;
}
