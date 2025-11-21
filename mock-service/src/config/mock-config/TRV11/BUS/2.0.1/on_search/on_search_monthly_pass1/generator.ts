import { SessionData } from "../../../../session-types";
import { createFullfillment } from "./fulfillment-generator";

export function getStartStation(route: any, sessionData: any) {
  const startCode = sessionData?.start_station;
  if (!startCode) return null;

  const fulfillment = route?.fulfillments?.[0];
  if (!fulfillment) return null;

  const stops = fulfillment.stops || [];

  return stops.find(
    (s: any) => s?.location?.descriptor?.code === startCode
  ) || null;
}

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

export async function onSearchMonthlyPass1Generator(
  existingPayload: any,
  sessionData: SessionData
) {
  // assume updatePaymentDetails is available in scope (as in your project)
  existingPayload = updatePaymentDetails(existingPayload, sessionData);

  // generate route/fullfillments and take the first fulfillment
  const route = createFullfillment(sessionData.city_code ?? "std:011").fulfillments;
  const fulfillment = Array.isArray(route) && route.length ? route[0] : null;

  if (!fulfillment) {
    throw new Error("No fulfillment generated");
  }

  // find the stop matching sessionData.start_code
  const startCode = (sessionData as any).start_code;
  const startStop = (fulfillment.stops || []).find(
    (s: any) => s?.location?.descriptor?.code === startCode
  );

  if (!startStop) {
    throw new Error("Start station not found in generated route");
  }

  // build the final fulfillment: keep id & vehicle, drop tags, add customer.person.creds
  const finalFulfillment = {
    id: fulfillment.id,
    type: "PASS",
    customer: {
      person: {
        creds: [
          { type: "PAN" },
          { type: "AADHAR" },
          { type: "DL" },
          { type: "VOTER_ID" },
        ],
      },
    },
    stops: [
      {
        type: "START",
        location: {
          descriptor: { code: startStop.location.descriptor.code },
          gps: startStop.location.gps,
        },
        id: String(startStop.id),
      },
    ],
    vehicle: fulfillment.vehicle,
  };

  existingPayload.message.catalog.providers[0].fulfillments = [finalFulfillment];

  return existingPayload;
}

