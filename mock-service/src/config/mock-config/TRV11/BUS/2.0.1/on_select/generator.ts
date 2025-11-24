import { SessionData } from "../../../session-types";

const createQuoteFromItems = (items: any): any => {
  let totalPrice = 0;
  const currency = items[0]?.price?.currency || "INR";

  const breakup = items.map((item: any) => {
    const itemTotalPrice =
      Number(item.price?.value || 35) * item.quantity.selected.count;
    totalPrice += itemTotalPrice;

    return {
      title: "BASE_FARE",
      item: {
        id: item.id,
        price: {
          currency,
          value: item.price?.value || 35,
        },
        quantity: {
          selected: {
            count: item.quantity.selected.count,
          },
        },
      },
      price: {
        currency,
        value: itemTotalPrice.toFixed(2),
      },
    };
  });

  // Add OFFER and TOLL to breakup
  breakup.push(
    {
      title: "OFFER",
      price: {
        currency,
        value: "0",
      },
    },
    {
      title: "TOLL",
      price: {
        currency,
        value: "0",
      },
    }
  );

  return {
    price: {
      value: totalPrice.toFixed(2),
      currency,
    },
    breakup,
  };
};

function createAndAppendFulfillments(items: any[], fulfillments: any[]): void {
  items.forEach((item) => {
    // Ensure item.fulfillment_ids exists
    if (!item.fulfillment_ids) {
      item.fulfillment_ids = [];
    }

    const quantity = item.quantity?.selected?.count || 0;

    for (let i = 0; i < quantity; i++) {
      // Create new fulfillment object
      const newFulfillment = {
        id: `F${Math.random().toString(36).substring(2, 9)}`,
        type: "TICKET",
        tags: [
          {
            descriptor: { code: "INFO" },
            list: [
              {
                descriptor: { code: "PARENT_ID" },
                value: "NONE", // since no parent logic needed
              },
            ],
          },
        ],
      };

      // Push to fulfillments array
      fulfillments.push(newFulfillment);

      // Push new ID to item.fulfillment_ids
      item.fulfillment_ids.push(newFulfillment.id);
    }
  });
}

function getUniqueFulfillmentIdsAndFilterFulfillments(
  items: any[],
  fulfillments: any[]
): any[] {
  if (!Array.isArray(fulfillments)) {
    fulfillments = fulfillments ? [fulfillments] : [];
  }
  // Step 1: Get all unique fulfillment IDs from the items
  const fulfillmentIds = items
    .flatMap((item) => item.fulfillment_ids) // Flatten the fulfillment_ids arrays
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  // Step 2: Filter the fulfillments based on the unique fulfillment IDs
  const filteredFulfillments = fulfillments.filter(
    (fulfillment) => fulfillmentIds.includes(fulfillment.id) // Check if fulfillment.id is in the unique fulfillmentIds list
  );

  return filteredFulfillments;
}

const filterItemsBySelectedIds = (
  items: any[],
  selectedIds: string | string[]
): any[] => {
  // Convert selectedIds to an array if it's a string
  const idsToFilter = Array.isArray(selectedIds) ? selectedIds : [selectedIds];

  // Filter the items array based on the presence of ids in selectedIds
  return items.filter((item) => idsToFilter.includes(item.id));
};

export async function onSelectGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  let items = filterItemsBySelectedIds(
    sessionData.items,
    sessionData.selected_item_ids
  );
  let fulfillments = getUniqueFulfillmentIdsAndFilterFulfillments(
    sessionData.items,
    sessionData.fulfillments
  );
  const ids_with_quantities = {
    items: sessionData.selected_items.reduce((acc: any, item: any) => {
      acc[item.id] = item.quantity.selected.count;
      return acc;
    }, {}),
  };
  console.log(
    "existingPayload.message.order.items[index]",
    JSON.stringify(existingPayload.message.order.items)
  );
  const updatedItems = sessionData.items
    .map((item: any, index: number) => ({
      ...item,
      price:
        existingPayload.message.order.items[index]?.price ||
        existingPayload.message.order.items[0]?.price,
      quantity: {
        selected: {
          count: ids_with_quantities["items"][item.id] ?? 0, // Default to 0 if not in the mapping
        },
      },
    }))
    .filter((item) => item.quantity.selected.count > 0);
  items = updatedItems;
  console.log("updatedItems", JSON.stringify(updatedItems));
  console.log("fulfillments", JSON.stringify(fulfillments));
  createAndAppendFulfillments(updatedItems, fulfillments);
  const quote = createQuoteFromItems(updatedItems);
  existingPayload.message.order.items = items;
  existingPayload.message.order.fulfillments = fulfillments;
  existingPayload.message.order.fulfillments.forEach((fulfillment: any) => {
    if (fulfillment.type === "ROUTE") {
      fulfillment.type = "TRIP";
    }
  });
  existingPayload.message.order.quote = quote;
  return existingPayload;
}
