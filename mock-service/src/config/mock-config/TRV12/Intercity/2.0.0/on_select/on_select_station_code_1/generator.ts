import { SessionData } from "../../../../session-types";

function generateSeatGridTag(
  x: string,
  y: string,
  z: string,
  seatNumber: string,
  gender: string,
  itemId: string
) {
  return {
    descriptor: { code: "SEAT_GRID" },
    list: [
      { descriptor: { code: "X" }, value: x },
      { descriptor: { code: "Y" }, value: y },
      { descriptor: { code: "Z" }, value: z },
      { descriptor: { code: "X_SIZE" }, value: "1" },
      { descriptor: { code: "Y_SIZE" }, value: "1" },
      { descriptor: { code: "NUMBER" }, value: seatNumber },
      { descriptor: { code: "RESTRICTED_GENDER" }, value: gender },
      { descriptor: { code: "SINGLE_SEAT" }, value: "TRUE" },
      { descriptor: { code: "SEAT_PRICE" }, value: "50" },
      { descriptor: { code: "ITEM_ID" }, value: itemId },
      { descriptor: { code: "AVAILABLE" }, value: "true" },
    ],
  };
}

export async function onSelectGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  existingPayload.context.location.city.code = sessionData.city_code;
  const count = (sessionData?.selected_item_counts as number) ?? 0;
  const sessionItems = sessionData.items || [];
  const selectedId = sessionData.select_items?.id;
  const idExists = sessionItems.some((item: any) => item.id === selectedId);

  if (idExists) {
    existingPayload.message.order.items = sessionItems.filter(
      (item: any) => item.id === selectedId
    );
  } else {
    existingPayload.message.order.items =
      sessionItems.length > 0 ? [sessionItems[0]] : [];
  }

  // if(existingPayload.message.order.items.length === 0) {
  // existingPayload.message.order.items = sessionItems[0]
  // }

  existingPayload.message.order.items.forEach((item: any) => {
    item.quantity = sessionData.selected_quantity;
    const newFulfillments = Array.from(
      { length: count },
      (_, i) => `FT${i + 1}`
    );
    item.fulfillment_ids = [
      ...(item.fulfillment_ids || []),
      ...newFulfillments,
    ];
    delete item.cancellation_terms;
  });

  const detailedFulfillment = sessionData?.fulfillments?.[0];
  const simplifiedStops = sessionData.fulfillment?.stops ?? [];

  const filteredStops = detailedFulfillment.stops.filter((stop: any) =>
    simplifiedStops.some((ss: any) => ss.id === stop.id)
  );

  const seatCount =
    Number(sessionData?.selected_quantity?.selected?.count) || 2;
  const tags = Array.from({ length: seatCount+3 }, (_, index) => {
    const seatNumber = `S${index + 1}`;
    const gender = "MALE";
    const x = String(index % 2);
    const y = String(Math.floor(index / 2));
    const z = "0";

    return generateSeatGridTag(x, y, z, seatNumber, gender, idExists ? selectedId : 'I1');
  });

  const updatedFulfillments = [
    {
      id: detailedFulfillment.id,
      type: detailedFulfillment.type,
      vehicle: detailedFulfillment.vehicle,
      stops: filteredStops,
      tags: tags,
    },
    ...Array.from({ length: count }, (_, i) => ({
      id: `FT${i + 1}`,
      type: "TICKET",
    })),
  ];
  existingPayload.message.order.fulfillments = updatedFulfillments;

  existingPayload.message.order.provider = {
    id: sessionData.provider_id,
    descriptor: sessionData.providers.descriptor,
  };

  return existingPayload;
}
