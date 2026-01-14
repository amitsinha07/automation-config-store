/**
 * On_Update Soft Partial Cancellation Generator for TRV14
 * 
 * Logic:
 * 1. Returns order with SOFT_CANCEL status
 * 2. Updates item quantity from 2 to 1
 * 3. Adds REFUND entry in quote breakup for cancelled quantity
 * 4. Recalculates total price
 */

export async function onUpdateSoftPartialCancellationGenerator(existingPayload: any, sessionData: any) {
  // Load order details from session
  if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
  }

  // Set order status to SOFT_CANCEL
  existingPayload.message.order.status = "SOFT_CANCEL";

  // Load items from session with updated quantities
  if (sessionData.items) {
    const items = [...sessionData.items];

    // Find and update the cancelled item quantity
    const selectedItem = sessionData.selected_items?.[0];
    const updatedItem = sessionData.updated_items;
    if (selectedItem) {
      const itemIndex = items.findIndex((item: any) => item.id === selectedItem.id);
      if (itemIndex < 0) {
        // Update quantity to 1 (reduced from 2)
        items[itemIndex] = {
          ...items[itemIndex],
          quantity: {
            ...items[itemIndex].quantity,
            selected: {
              count: 1
            }
          }
        };
        // Update add-ons quantity if present
        if (items[itemIndex].add_ons) {
          items[itemIndex].add_ons = items[itemIndex].add_ons.map((addOn: any) => ({
            ...addOn,
            quantity: {
              selected: {
                count: updatedItem.add_ons[0].quantity.selected.count
              }
            }
          }));
        }
      }
    }

    existingPayload.message.order.items = items;
  }

  // Load fulfillments from session
  if (sessionData.fulfillments) {
    existingPayload.message.order.fulfillments = sessionData.fulfillments;
  }
  // Load provider from session
  if (sessionData.provider) {
    existingPayload.message.order.provider = sessionData.provider;
  }
  // Load billing from session
  if (sessionData.billing) {
    existingPayload.message.order.billing = sessionData.billing;
  }
  // Load payments from session
  if (sessionData.payments) {
    existingPayload.message.order.payments = sessionData.payments;
  }

  // Load tags from session
  if (sessionData.tags) {
    existingPayload.message.order.tags = sessionData.tags;
  }

  // Load cancellation_terms from session
  if (sessionData.cancellation_terms) {
    existingPayload.message.order.cancellation_terms = sessionData.cancellation_terms;
  }
  // Load replacement_terms from session
  if (sessionData.replacement_terms) {
    existingPayload.message.order.replacement_terms = sessionData.replacement_terms;
  }

  // Calculate updated quote with refund
  const selectedItem = sessionData.selected_items?.[0];
  const updatedItem = sessionData.updated_items;
  const cancelItemQty = Math.max(selectedItem.quantity.selected.count - updatedItem.quantity.selected.count, 0)
  if (sessionData.quote && selectedItem) {
    const breakup = [...sessionData.quote.breakup];
    const addOnItemPrice = sessionData.items[1].add_ons[0].price;
    const itemPrice = sessionData.items[1].price

    // Calculate refund amount for cancelled item
    let refundAmount = cancelItemQty * Number(itemPrice.value);

    // Add refund for add-ons if present
    if (selectedItem.add_ons) {
      refundAmount = Number(refundAmount) + Number(addOnItemPrice.value)
    }

    // Add REFUND entry to breakup
    breakup.push({
      title: "REFUND",
      item: {
        id: selectedItem.id,
        price: {
          currency: itemPrice?.currency || "INR",
          value: `-${(cancelItemQty * itemPrice.value).toFixed(2)}`
        },
        quantity: {
          selected: {
            count: cancelItemQty
          }
        },
        ...(selectedItem.add_ons && {
          add_ons: selectedItem.add_ons.map((addOn: any) => ({
            id: addOn.id,
            price: {
              currency: addOnItemPrice.currency || "INR",
              value: addOnItemPrice.value
            }
          }))
        })
      },
      price: {
        currency: selectedItem.price?.currency || "INR",
        value: `-${refundAmount}`
      }
    });
    // Add cancellation charges (0 for soft cancel)
    breakup.push({
      title: "CANCELLATION_CHARGES",
      price: {
        currency: "INR",
        value: "0"
      }
    });

    // Recalculate total price
    const originalTotal = parseFloat(sessionData.quote.price.value);
    const newTotal = originalTotal - refundAmount;

    existingPayload.message.order.quote = {
      breakup,
      price: {
        currency: sessionData.quote.price.currency || "INR",
        value: newTotal.toString()
      }
    };
  }
  // Add timestamps
  if (sessionData.created_at) {
    existingPayload.message.order.created_at = sessionData.created_at;
  }
  existingPayload.message.order.updated_at = existingPayload.context.timestamp;
  return existingPayload;
}