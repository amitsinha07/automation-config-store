import { SessionData } from "../../../../session-types";

export async function selectGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  existingPayload.context.location.city.code = sessionData.city_code;
  console.log('sessionData.on_select_fulfillments', JSON.stringify(sessionData.on_select_fulfillments))
  const updatedFulfillment = transformFulfillments(
    sessionData.on_select_fulfillments,
    sessionData?.on_select_fulfillments_tags,
    sessionData
  );

  console.log("updatedFulfillment-", JSON.stringify(updatedFulfillment));
  existingPayload.message.order.fulfillments = [...updatedFulfillment];

  existingPayload.message.order.items = [sessionData.select_items];
  existingPayload.message.order.provider = { id: sessionData.provider_id };

  return existingPayload;
}

function transformFulfillments(
  fulfillments: any[],
  ticketTags: any[],
  sessionData: SessionData
) {
  const updatedFulfillment = fulfillments.flat()
  console.log("updatedFulfillment-", JSON.stringify(updatedFulfillment));
  const transformedFulfillments = updatedFulfillment.map((f: any) => {
    if (f.type === "TRIP") {
      return sessionData.select_fulfillments;
    } else if (f.type === "TICKET") {
      const filteredTags = [ticketTags].map((tag: any) => {
        if (tag.descriptor.code === "SEAT_GRID") {
          return {
            descriptor: tag.descriptor,
            list: [
              ...tag.list.filter(
                (item: any) =>
                  item.descriptor.code === "NUMBER" ||
                  item.descriptor.code === "ITEM_ID"
              ),
              {
                descriptor: { code: "SELECTED" },
                value: "true",
              },
            ],
          };
        }
        return tag;
      });

      console.log('filteredTags', filteredTags)

      return {
        id: f.id,
        tags: filteredTags,
      };
    }
    return f;
  });

  return transformedFulfillments;
}
