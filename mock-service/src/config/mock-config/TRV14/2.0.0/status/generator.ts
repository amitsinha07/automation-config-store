export async function statusDefaultGenerator(existingPayload: any, sessionData: any) {
  if (sessionData.order_id) {
    existingPayload.message.order_id = sessionData.order_id;
  }

  if (sessionData.flow_id === "technical_cancellation" || sessionData.flow_id === "technical_cancellation_with_form") {
    existingPayload.message = {
      ref_id: existingPayload?.context?.transaction_id ?? crypto.randomUUID(),
    };
  }
  return existingPayload;
} 