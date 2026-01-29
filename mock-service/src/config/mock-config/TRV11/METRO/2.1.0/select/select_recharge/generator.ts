export async function selectRechargeGenerator(
  existingPayload: any,
  sessionData: any,
) {
  const metroPurchaseItem = sessionData?.items?.flat().find((item: any) => {
    return item.descriptor.code === "RECHARGE";
  });
  const metroPurchaseFulfillment = sessionData?.fulfillments
    ?.flat()
    .find((fulfillment: any) => {
      return fulfillment.type === "ONLINE";
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
      type: metroPurchaseFulfillment?.type ?? "ONLINE",
      customer: {
        person: {
          creds: [
            {
              id: "1234-5678-9101-1121",
              type: "CARD_IDENTIFIER",
            },
          ],
        },
      },
    },
  ];
  return existingPayload;
}
