export async function statusActiveGenerator(
  existingPayload: any,
  sessionData: any,
  isCancelCall: boolean
) {
  isCancelCall
    ? (existingPayload.message = {
        ref_id:
          existingPayload?.context?.transaction_id ??
          "6f339232-2bc3-44d2-915c-30d2b053ce1d",
      })
    : (existingPayload.message.order_id = sessionData.order_id);
  return existingPayload;
}
