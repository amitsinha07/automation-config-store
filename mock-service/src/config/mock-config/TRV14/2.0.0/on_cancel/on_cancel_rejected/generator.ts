export async function onCancelSoftUserCancellationGenerator(existingPayload: any, sessionData: any) {
  delete existingPayload.message
  existingPayload.error = {
    "code": "93201",
    "message": "Cancellation is not allowed by seller app."
  }
  return existingPayload;
} 