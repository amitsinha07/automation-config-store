import { SessionData } from "../../../../session-types";
import { createFullfillment } from "./fulfillment-generator";


function updatePaymentDetails(payload: any, sessionData: SessionData) {
  const providers = payload?.message?.catalog?.providers || [];

  providers.forEach((provider: any) => {
    const payments = provider?.payments || [];

    payments.forEach((payment: any) => {
      // Update collected_by
      payment.collected_by = sessionData.collected_by;

      // Update BUYER_FINDER_FEES_PERCENTAGE in tags
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
          // Add it if not present
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

export async function onSearchMonthlyPassGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  existingPayload = updatePaymentDetails(existingPayload, sessionData);
    const route = createFullfillment(
      sessionData.city_code ?? "std:011"
    ).fulfillments;
    existingPayload.message.catalog.providers[0].fulfillments = route;
    return existingPayload;
}
