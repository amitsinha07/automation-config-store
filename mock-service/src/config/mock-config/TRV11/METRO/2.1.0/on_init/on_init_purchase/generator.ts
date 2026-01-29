import { v4 as uuidv4 } from "uuid";
export async function onInitPurchaseGenerator(
  existingPayload: any,
  sessionData: any,
) {
  existingPayload.context.location.city.code =
    sessionData?.select_city_code ?? "std:080";
  existingPayload.message.order.provider = sessionData.provider;
  existingPayload.message.order.items = sessionData?.items.flat() ?? [];
  existingPayload.message.order.fulfillments =
    sessionData?.buyer_side_fulfillment_ids.flat() ?? [];
  existingPayload.message.order.cancellation_terms =
    sessionData?.cancellation_terms?.flat() ?? [];
  existingPayload.message.order.quote = sessionData?.quote ?? {};
  existingPayload.message.order.billing = sessionData?.billing ?? {};
  existingPayload.message.order.payments =
    sessionData?.payments?.flat()?.map((item: any) => {
      return {
        id: uuidv4(),
        ...item,
      };
    }) ?? [];

  return existingPayload;
}
