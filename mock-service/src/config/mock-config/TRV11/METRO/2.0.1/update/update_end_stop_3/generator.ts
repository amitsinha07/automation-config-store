export async function updateEndStopGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
    const updatedPrice =
      Number(sessionData.newQuote) - Number(sessionData.oldQuote);
    existingPayload.message.order.payments[0].params.amount =
      updatedPrice.toString();
  }
  return existingPayload;
}
