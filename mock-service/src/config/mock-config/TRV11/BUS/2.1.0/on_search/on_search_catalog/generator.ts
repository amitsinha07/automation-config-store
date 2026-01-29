import { SessionData } from "../../../../session-types";

function updateItemTimestamps(payload: any) {
  const now = new Date().toISOString();

  const providers = payload?.message?.catalog?.providers;
  if (!Array.isArray(providers)) return payload;

  providers.forEach((provider: any) => {
    if (!Array.isArray(provider.items)) return;

    provider.items.forEach((item: any) => {
      if (item?.time && typeof item.time === "object" && "timestamp" in item.time) {
        item.time.timestamp = now;
      }
    });
  });

  return payload;
}

export async function onSearchCatalogGenerator(
    existingPayload: any,
    sessionData: SessionData
) {
    existingPayload = updateItemTimestamps(existingPayload);
    return existingPayload;
}
