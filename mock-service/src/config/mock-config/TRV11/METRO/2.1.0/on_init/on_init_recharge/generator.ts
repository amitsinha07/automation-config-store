import { v4 as uuidv4 } from "uuid";

export async function onInitRechargeGenerator(
  existingPayload: any,
  sessionData: any,
) {
  existingPayload.context.location.city.code =
    sessionData?.select_city_code ?? "std:080";
  const onSelectFulfillment = sessionData?.fulfillments?.flat()?.find((i: any) => {
    return i.type === "ONLINE";
  });
  existingPayload.message.order.provider = sessionData.provider;
  existingPayload.message.order.items = sessionData?.items.flat() ?? [];
  existingPayload.message.order.fulfillments =
    sessionData?.buyer_side_fulfillment_ids.flat()?.map((fulfillment: any) => {
      return {
        ...fulfillment,
        stops: onSelectFulfillment?.stops ?? [],
      };
    }) ?? [];
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
