import { SessionData } from "../../session-types";

export async function searchMultipleStopsGenerator(
  existingPayload: any,
  sessionData: SessionData,
  isFemaleRide?: boolean,
) {
  delete existingPayload.context.bpp_uri;
  delete existingPayload.context.bpp_id;

  if (isFemaleRide) {
    existingPayload.message.intent.fulfillment = {
      ...existingPayload.message.intent.fulfillment,
      customer: {
        person: {
          gender: "FEMALE",
        },
      },
      agent: {
        person: {
          gender: "FEMALE",
        },
      },
    };
  }
  
  return existingPayload;
}
