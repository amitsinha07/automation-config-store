function createItemPayload(userInputItem: any, addOnsToInclude: any[] = []): any {
  const itemPayload: any = {
    quantity: {
      selected: {
        count: userInputItem.count || 1,
      },
    },
  };

  itemPayload.parent_item_id = userInputItem.itemId;

  if (addOnsToInclude.length > 0) {
    console.log('Distributing add-ons for item:', userInputItem.itemId, addOnsToInclude);


    itemPayload.add_ons = addOnsToInclude.map((addOn: any) => ({
      id: addOn.id,
      quantity: {
        selected: { count: addOn.count },
      },
    }));
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

    const remainingAddOns = (item.addOns || []).map((ao: any) => ({
      id: ao.id,
      remaining: Number(ao.count) || 0
    }));

    return Array.from({ length: itemCount }, (_, index) => {
      const isLastItem = index === itemCount - 1;
      const currentAddOns: any[] = [];

      remainingAddOns.forEach((ao: any) => {
        let countToAssign = 0;
        if (isLastItem) {

          countToAssign = ao.remaining;
        } else if (ao.remaining > 0) {

          countToAssign = 1;
        }

        if (countToAssign > 0) {
          currentAddOns.push({ id: ao.id, count: countToAssign });
          ao.remaining -= countToAssign;
        }
      });

      return createItemPayload({ ...item, count: 1 }, currentAddOns);
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
