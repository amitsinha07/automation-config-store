import { randomBytes } from "crypto";
import { SessionData } from "../../../../session-types";

function generateQrToken(): string {
  return randomBytes(32).toString("base64");
}

export async function onConfirmPurchaseGenerator(
  existingPayload: any,
  sessionData: SessionData,
) {
  existingPayload.context.location.city.code =
    sessionData?.select_city_code ?? "std:080";
  const qrToken = generateQrToken();
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  const y = istNow.getFullYear();
  const m = istNow.getMonth();
  const d = istNow.getDate();
  const currentDate = new Date().toISOString();
  const endIST = new Date(Date.UTC(y, m, d + 1, 4 - 5, 30 - 30, 0));
  const validTo = endIST.toISOString();
  const orderId = Math.random().toString(36).substring(2, 15);
  existingPayload.message.order.id = orderId;
  existingPayload.message.order.provider = sessionData.provider;
  existingPayload.message.order.items = sessionData?.items.flat() ?? [];
  existingPayload.message.order.fulfillments =
    sessionData?.buyer_side_fulfillment_ids.flat()?.map((fulfillment: any) => {
      return {
        ...fulfillment,
        stops: [
          {
            type: "START",
            authorization: {
              type: "QR",
              token: qrToken,
              valid_to: validTo,
              status: "ACTIVE",
            },
          },
        ],
        customer: {
          ...fulfillment.customer,
          person: {
            ...fulfillment.customer.person,
            creds: [
              {
                id: "7ed21b6f",
                type: "CARD_IDENTIFIER",
              },
            ],
          },
        },
      };
    }) ?? [];
  existingPayload.message.order.cancellation_terms =
    sessionData?.cancellation_terms?.flat() ?? [];
  existingPayload.message.order.quote = sessionData?.quote ?? {};
  existingPayload.message.order.billing = sessionData?.billing ?? {};
  existingPayload.message.order.payments =
    sessionData?.updated_payments?.flat() ?? [];
  existingPayload.message.order.created_at = currentDate;
  existingPayload.message.order.updated_at = currentDate;
  existingPayload.message.order.tags = sessionData?.confirm_tags?.flat()
  return existingPayload;
}
