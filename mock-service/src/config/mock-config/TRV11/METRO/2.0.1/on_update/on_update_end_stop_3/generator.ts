import { v4 as uuidV4 } from "uuid";
export async function onUpdateStopEndGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData.updated_payments.length > 0) {
    existingPayload.message.order.payments = sessionData.updated_payments;
  }

  if (sessionData.items.length > 0) {
    existingPayload.message.order.items = sessionData.items;
  }

  if (sessionData.fulfillments.length > 0) {
    existingPayload.message.order.fulfillments = sessionData.fulfillments;
  }
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
  }
  if (sessionData.quote != null) {
    existingPayload.message.order.quote = sessionData.quote;
  }
  if (sessionData.provider) {
    existingPayload.message.order.provider = sessionData.provider;
  }
  if (sessionData.payments) {
    existingPayload.message.order.payments = sessionData.payments;
    existingPayload.message.order.payments[1].params = {
      transaction_id: uuidV4(),
      amount:
        sessionData?.updated_price ||
        existingPayload.message.order.quote.price.value,
      currency: "INR",
    };
    existingPayload.message.order.payments[1].status = "PAID";
  }

  const now = new Date().toISOString();
  existingPayload.message.order.created_at = sessionData.created_at;
  existingPayload.message.order.updated_at = now;
  return existingPayload;
}
