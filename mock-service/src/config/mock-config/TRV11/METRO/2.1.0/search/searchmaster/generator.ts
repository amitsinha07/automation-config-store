export async function searchMasterGenerator(
  existingPayload: any,
  sessionData: any,
) {
  delete existingPayload.context.bpp_id;
  delete existingPayload.context.bpp_uri;
  delete existingPayload.context.location.city;
  return existingPayload;
}
