function createItemPayload(userInputItem: any): any {
  const itemPayload: any = {
    quantity: {
      selected: {
        count: userInputItem.count || 1,
      },
    },
  };

  if (
    userInputItem.addOns &&
    Array.isArray(userInputItem.addOns) &&
    userInputItem.addOns.length > 0
  ) {
    // Only use parent_item_id when add-ons exist
    itemPayload.parent_item_id = userInputItem.itemId;

    console.log('userInputItem.addOns', userInputItem.addOns)

    // Add add-ons
    itemPayload.add_ons = userInputItem.addOns.map((addOn: any) => ({
      id: addOn.id,
      quantity: {
        selected: { count: addOn.count || 1},
      },
    }));
  } else {
    // Use id only when no add-ons
    itemPayload.parent_item_id = userInputItem.itemId;
  }

  return itemPayload;
}


export async function select_1_DefaultGenerator(
  existingPayload: any,
  sessionData: any
) {
  
  // delete existingPayload.context.bpp_uri;
  // delete existingPayload.context.bpp_id;
    const userInputs = typeof sessionData.user_inputs?.data === "string"
    ? JSON.parse(sessionData.user_inputs.data)
    : sessionData.user_inputs;

  console.log('userInputs.items', userInputs.items, userInputs)

  // Process all items from user_inputs
const itemPayloads = userInputs.items.flatMap((item: any) => {
  const count = Number(item.count) || 1;

  return Array.from({ length: count }, () =>
    createItemPayload({ ...item, count: 1 })
  );
});


  // Update the payload with all selected items
  existingPayload.message.order.items = itemPayloads;

  // Set provider ID from user_inputs
  // existingPayload.message.order.provider.id = userInputs.provider;

  // Create fulfillment object with the selected fulfillment ID
  // const contextTimestamp =
  //   existingPayload.context?.timestamp || new Date().toISOString();

  existingPayload.message.order.fulfillments = [
    {
      id: userInputs.fulfillment || 'F1',
      stops: [
        {
          id: "S1",
        },
        {
          id: "S2",
        },
      ],
    },
  ];

  return existingPayload;
}
