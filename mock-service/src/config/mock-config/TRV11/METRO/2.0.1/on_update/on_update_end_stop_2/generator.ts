export async function onUpdateStopEndGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData.updated_payments.length > 0) {
    existingPayload.message.order.payments = [
      ...sessionData.updated_payments,
      {
        collected_by: "BAP",
        id: "PA2",
        status: "NOT-PAID",
        type: "POST-FULFILLMENT",
      },
    ];
  }

  if (sessionData.items.length > 0) {
    existingPayload.message.order.items = sessionData.items;
  }

  if (sessionData.payments.length > 0) {
    existingPayload.message.order.payments = sessionData.payments;
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
  const now = new Date().toISOString();
  existingPayload.message.order.created_at = sessionData.created_at;
  existingPayload.message.order.updated_at = now;
  return existingPayload;
}
