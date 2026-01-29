export async function updateEndStopGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
    const updatedPrice =
      Number(sessionData.newQuote) - Number(sessionData.oldQuote);
    existingPayload.message.order.payments[0].params.amount = sessionData?.newQuote ?? "0"
    existingPayload.message.order.payments[0].id = sessionData?.newPaymentId;
    existingPayload.message.order.payments[0].status = "PAID";
    existingPayload.message.order.payments[0].collected_by = sessionData?.newPayment_collected_by;
    existingPayload.message.order.payments[0].type = sessionData?.newPayment_type;
    existingPayload.message.order.payments[0].params.transaction_id = crypto.randomUUID();
  }
  return existingPayload;
}
