import { SessionData } from "../../../../session-types";

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

export async function onSelectGenerator(
  existingPayload: any,
  sessionData: SessionData
) {
  existingPayload.message.order.items.forEach((item: any, index: number) => {
    item.time.timestamp = new Date(Date.now()).toISOString();
    item.time.range.start = new Date(Date.now()).toISOString();
    item.time.range.end = new Date(Date.now() + 3 * 60 * 60 * 60).toISOString();
    item.quantity.selected.count =
      sessionData?.items[index]?.quantity?.selected?.count || 1;
  });
  existingPayload.message.order.fulfillments = sessionData.fulfillments.map(
    (fulfillment) => ({
      ...fulfillment,
      stops: [
        {
          type: "START",
          location: {
            descriptor: {
              code: "std:011",
            },
            gps: "28.666576, 77.233332",
          },
          id: "1",
        },
      ],
      vehicle: {
        category: "BUS",
        variant: "AC",
      },
    })
  );

  const quote = createQuoteFromItems(existingPayload.message.order.items);
  existingPayload.message.order.quote = quote;

  return existingPayload;
}