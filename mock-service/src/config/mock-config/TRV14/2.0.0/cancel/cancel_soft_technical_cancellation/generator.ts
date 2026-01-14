export async function cancelSoftTechnicalCancellationGenerator(existingPayload: any, sessionData: any) {
  if (sessionData.order_id) {
    existingPayload.message.order_id = sessionData.order_id;
  }

  if (sessionData.flow_id === 'Cancellation Rejected') {
    existingPayload.message.cancellation_reason_id = "001";
    existingPayload.message.descriptor.name = "Ride Cancellation";
  }
  return existingPayload;
} 
