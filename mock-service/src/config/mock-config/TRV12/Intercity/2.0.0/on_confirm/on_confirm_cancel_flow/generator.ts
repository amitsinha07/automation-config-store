export async function onConfirmGenerator(
  existingPayload: any,
  sessionData: any
) {
  const randomId = Math.random().toString(36).substring(2, 15);
  existingPayload.message.order.id = randomId;
  existingPayload.context.location.city.code =
    sessionData.user_inputs.city_code;

  return existingPayload;
}
