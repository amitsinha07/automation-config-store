function createItemPayload(userInputItem: any, includeAddOns: boolean = false): any {
  const itemPayload: any = {
    quantity: {
      selected: {
        count: userInputItem.count || 1,
      },
    },
  };

  if (
    includeAddOns &&
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
        selected: { count: 1 },
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

  const userInputs = typeof sessionData.user_inputs?.data === "string"
    ? JSON.parse(sessionData.user_inputs.data)
    : sessionData.user_inputs;


  const itemPayloads = userInputs.items.flatMap((item: any) => {
    const itemCount = Number(item.count) || 1;
    const totalAddOns = Array.isArray(item.addOns)
      ? item.addOns.reduce(
        (total: number, current: any) => total + (Number(current.count) || 0),
        0
      )
      : 0;

    return Array.from({ length: itemCount }, (_, index) => {
      const includeAddOns = index < totalAddOns;
      return createItemPayload({ ...item, count: 1 }, includeAddOns);
    });
  });


  existingPayload.message.order.items = itemPayloads;

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
