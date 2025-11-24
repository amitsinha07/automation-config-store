import { exampleFullfillment } from "../../on_search/fullfillment-generator";

export async function updateEndStopGenerator(
  existingPayload: any,
  sessionData: any
) {
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
  }
  const endCode = sessionData.user_inputs?.end_code;
  const updatedFulfillments = exampleFullfillment.fulfillments[0].stops.find(
    (stop: any) => stop.location.descriptor.code === endCode
  );
  const endGps = updatedFulfillments?.location?.gps;

  existingPayload.message.order.fulfillments.forEach((fulfillment: any) => {
    fulfillment.stops.forEach((stop: any) => {
      stop.location.descriptor.code = endCode;
      stop.location.descriptor.name = endCode;

      if (endGps) {
        stop.location.gps = endGps;
      }
    });
  });

  return existingPayload;
}
