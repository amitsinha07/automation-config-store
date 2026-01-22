import { SessionData } from "../../session-types";
import { onUpdateMultipleStopsGenerator } from "./generator_multiple_stops";

function updateFulfillmentStatus(order: any, sessionData: SessionData) {
  // Check if fulfillments exist
  if (order.fulfillments) {
    order.fulfillments.forEach((fulfillment: any) => {
      if (
        sessionData?.flow_id ===
        "OnDemand_Assign_driver_post_onconfirmSelfPickup"
      ) {
        fulfillment.type = "SELF_PICKUP";
      }
      fulfillment.state.descriptor.code = "RIDE_ENDED";
    });
  }
  return order;
}

export async function onUpdateRideEndedGenerator(
  existingPayload: any,
  sessionData: SessionData,
) {
  existingPayload = await onUpdateMultipleStopsGenerator(
    existingPayload,
    sessionData,
  );
  existingPayload.message.order = updateFulfillmentStatus(
    existingPayload.message.order,
    sessionData
  );
  if (sessionData.flow_id === "OnDemand_Assign_driver_on_onconfirm") {
    existingPayload.message.order.items =
      existingPayload?.message?.order?.items?.map((item: any) => {
        const filteredTags =
          item?.tags?.filter(
            (tag: any) => tag?.descriptor?.code === "FARE_POLICY",
          ) ?? [];

        return {
          ...item,
          tags: filteredTags,
        };
      }) ??
      existingPayload?.message?.order?.items?.map((item: any) => {
        const filteredTags = item?.tags?.[0];

        return {
          ...item,
          tags: filteredTags,
        };
      });
  }

  return existingPayload;
}
