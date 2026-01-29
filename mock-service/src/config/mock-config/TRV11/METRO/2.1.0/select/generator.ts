export async function selectGenerator(existingPayload: any, sessionData: any) {
  const rawData = sessionData.user_inputs?.data;
  const user_input =
    typeof rawData === "string" ? JSON.parse(rawData) : rawData;

  const items = user_input.items.map((i: any) => {
    return {
      id: i?.itemId ?? "",
      quantity: {
        selected: {
          count: Number(i?.itemQuantity) ?? 2,
        },
      },
    };
  });

  existingPayload.message.order.items = items;
  existingPayload.message.order.provider.id =
    sessionData.provider_id ?? "Provider1";
  return existingPayload;
}
