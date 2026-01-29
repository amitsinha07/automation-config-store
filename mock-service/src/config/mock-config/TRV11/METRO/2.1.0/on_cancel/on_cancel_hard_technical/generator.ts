export async function onCancelHardTechnicalGenerator(
  existingPayload: any,
  sessionData: any,
) {
  const now = new Date().toISOString();
  existingPayload.message.order = sessionData?.soft_technical_on_cancel ?? {}
  existingPayload.message.order.status = "CANCELLED"
  
  existingPayload.message.order.updated_at = now;
  return existingPayload;
}
