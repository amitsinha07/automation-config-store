const { v4: uuidv4 } = require("uuid");

const transformPaymentsToPaid = (
  payments: any,
  amount: any,
  currency = "INR",
) => {
  return payments.map((payment: any) => ({
    ...payment,
    status: "PAID",
    params: {
      transaction_id: uuidv4(), // Generates a UUID for transaction_id
      currency,
      amount,
    },
  }));
};
export async function confirmGenerator(existingPayload: any, sessionData: any) {
  if (sessionData.billing && Object.keys(sessionData.billing).length > 0) {
    existingPayload.message.order.billing = sessionData.billing;
  }

  if (sessionData.selected_items && sessionData.selected_items.length > 0) {
    existingPayload.message.order.items = sessionData.selected_items;
  }
  if (sessionData.provider_id) {
    existingPayload.message.order.provider.id = sessionData.provider_id;
  }
  if (sessionData.payments) {
    existingPayload.message.order.payments = transformPaymentsToPaid(
      sessionData.payments,
      sessionData.price,
    );
  }
  const tags = sessionData.tags.flat().filter(
    (item: any) => item.descriptor.code !== "ADDITIONAL_APIS",
  );
  existingPayload.message.order.tags = [
    {
      descriptor: {
        code: "BAP_TERMS",
        name: "BAP Terms of Engagemen",
      },
      display: false,
      list: [
        {
          descriptor: {
            code: "BUYER_FINDER_FEES_PERCENTAGE",
          },
          value: "1",
        },
        {
          descriptor: {
            code: "SETTLEMENT_WINDOW",
          },
          value: "PT60M",
        },
        {
          descriptor: {
            code: "SETTLEMENT_BASIS",
          },
          value: "Delivery",
        },
        {
          descriptor: {
            code: "SETTLEMENT_TYPE",
          },
          value: "NEFT",
        },
        {
          descriptor: {
            code: "MANDATORY_ARBITRATION",
          },
          value: "true",
        },
        {
          descriptor: {
            code: "COURT_JURISDICTION",
          },
          value: "New Delhi",
        },
        {
          descriptor: {
            code: "DELAY_INTEREST",
          },
          value: "2.5",
        },
        {
          descriptor: {
            code: "STATIC_TERMS",
          },
          value: "https://www.abc.com/settlement-terms/",
        },
        {
          descriptor: {
            code: "SETTLEMENT_AMOUNT",
          },
          value: "59",
        },
      ],
    },
    ...tags,
  ];
  return existingPayload;
}
