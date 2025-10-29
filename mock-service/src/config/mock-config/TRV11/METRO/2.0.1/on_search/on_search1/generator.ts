import { SessionData } from "../../../../session-types";
import { createFullfillment } from "../fullfillment-generator";
function updatePaymentDetails(payload: any, sessionData: SessionData) {
  const providers = payload?.message?.catalog?.providers || [];

  providers.forEach((provider: any) => {
    const payments = provider?.payments || [];

    payments.forEach((payment: any) => {
      payment.collected_by = sessionData.collected_by;
      const buyerFinderTag = payment.tags?.find(
        (tag: any) => tag.descriptor?.code === "BUYER_FINDER_FEES"
      );

      if (buyerFinderTag?.list) {
        const feeEntry = buyerFinderTag.list.find(
          (item: any) =>
            item.descriptor?.code === "BUYER_FINDER_FEES_PERCENTAGE"
        );

        if (feeEntry) {
          feeEntry.value = sessionData.buyer_app_fee;
        } else {
          buyerFinderTag.list.push({
            descriptor: { code: "BUYER_FINDER_FEES_PERCENTAGE" },
            value: sessionData.buyer_app_fee,
          });
        }
      }
    });
  });

  return payload;
}

export function generateTimeRange(payload: any) {
  const now = new Date();
  const istNow = new Date(now.getTime());
  const y = istNow.getFullYear();
  const m = istNow.getMonth();
  const d = istNow.getDate();
  const startIST = new Date(Date.UTC(y, m, d, 5 - 5, 30, 0));
  const endIST = new Date(Date.UTC(y, m, d, 23 - 5, 30, 0));
  const providers = payload?.message?.catalog?.providers || [];

  providers.forEach((provider: any) => {
    provider.time.range.start = startIST.toISOString();
    provider.time.range.end = endIST.toISOString();
  });
  return payload;
}


export async function onSearch1Generator(
  existingPayload: any,
  sessionData: any
) {
  existingPayload.message.catalog.providers[0].fulfillments =
    createFullfillment(sessionData.city_code).fulfillments;
  existingPayload = updatePaymentDetails(existingPayload, sessionData);
  existingPayload = generateTimeRange(existingPayload);
  return existingPayload;
}