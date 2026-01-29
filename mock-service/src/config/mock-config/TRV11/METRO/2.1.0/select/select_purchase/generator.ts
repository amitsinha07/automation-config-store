export async function selectPurchaseGenerator(
  existingPayload: any,
  sessionData: any,
) {
  const metroPurchaseItem = sessionData?.items?.flat().find((item: any) => {
    return item.descriptor.code === "PURCHASE";
  });
  const metroPurchaseFulfillment = sessionData?.fulfillments
    ?.flat()
    .find((fulfillment: any) => {
      return fulfillment.type === "PASS";
    });

  existingPayload.message.order.provider.id =
    sessionData?.provider_id ?? "PROVIDER01";
  existingPayload.message.order.items = [
    {
      id: metroPurchaseItem?.id ?? "PurchaseItemIdI3",
      price: {
        value: metroPurchaseItem?.price?.value ?? "200",
      },
    },
  ];
  existingPayload.message.order.fulfillments = [
    {
      id: metroPurchaseFulfillment?.id ?? "PurchaseFulfillmentIdF3",
    },
  ];
  return existingPayload;
}
