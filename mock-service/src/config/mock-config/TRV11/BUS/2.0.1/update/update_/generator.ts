import { SessionData } from "../../../../session-types";

function getRandomFourDigitInt() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function injectTicketFulfillments(payload: any, sessionData: SessionData) {
  const ticketFulfillments =
    sessionData.fulfillments?.filter((f: any) => f?.type === "TICKET") || [];

  payload.message.order.fulfillments = ticketFulfillments.map(
    (f: any, idx: number) => {
      const randomInt = getRandomFourDigitInt();
      return {
        id: f.id,
        vehicle: {
          registration: `TX${randomInt}`,
        },
      };
    }
  );

  return payload;
}

export async function updateGenerator(existingPayload: any, sessionData: any) {
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
  }
  existingPayload = injectTicketFulfillments(existingPayload, sessionData);
  return existingPayload;
}
