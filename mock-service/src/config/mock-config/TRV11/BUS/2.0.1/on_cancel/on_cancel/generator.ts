import { SessionData } from "config/mock-config/TRV11/session-types";

type Price = {
    value: string;
    currency: string;
  };
  
  type Item = {
    id: string;
    price: Price;
    quantity: {
      selected: {
        count: number;
      };
    };
  };
  
  type Breakup = {
    title: string;
    item?: Item;
    price: Price;
  };
  
  type Quote = {
    price: Price;
    breakup: Breakup[];
  };
    function updateSettlementAmount(order: any, sessionData: SessionData) {
    if (!order?.payments || !order?.quote?.price?.value) return order;
  
    const quoteValue = parseFloat(order.quote.price.value);
    const buyerFinderFee = parseFloat(sessionData.buyer_app_fee || "3");
    const newSettlementAmount = ((quoteValue * buyerFinderFee) / 100).toFixed(2);
    
    order.payments = order.payments.map((payment: any) => {
      if (!payment.tags) return payment;
  
      payment.tags = payment.tags.map((tag: any) => {
        if (tag.descriptor?.code === "SETTLEMENT_TERMS" && Array.isArray(tag.list)) {
          tag.list = tag.list.map((item: any) => {
            if (item.descriptor?.code === "SETTLEMENT_AMOUNT") {
              return {
                ...item,
                value: newSettlementAmount,
              };
            }
            return item;
          });
        }
        return tag;
      });
  
      return payment;
    });
  
    return order;
  }
  function stripTicketAuthorizations(order:any) {
    if (!order.fulfillments) return order;
  
    order.fulfillments = order.fulfillments.map((fulfillment:any) => {
      if (fulfillment.type === "TICKET") {
        return {
          ...fulfillment,
          stops: fulfillment.stops.map((stop:any) => {
            const { authorization, ...rest } = stop;
            return rest;
          })
        };
      }
      return fulfillment;
    });
  
    return order;
  }
  

function applyCancellation(quote: Quote, cancellationCharges: number): Quote {

    const currentTotal = parseFloat(quote.price.value);
    const refundAmount = quote.breakup
      .filter((b) => b.title === "BASE_FARE" && b.item)
      .reduce((sum, breakup) => {
        const itemTotal = parseFloat(breakup.price.value);
        return sum + itemTotal;
      }, 0);
  
    const refundBreakups: Breakup[] = quote.breakup
      .filter((b) => b.title === "BASE_FARE" && b.item)
      .map((baseFare) => ({
        title: "REFUND",
        item: {
          ...baseFare.item!,
          price: {
            ...baseFare.item!.price,
            value: `-${baseFare.item!.price.value}`,
          },
        },
        price: {
          ...baseFare.price,
          value: `-${baseFare.price.value}`, 
        },
      }));
  
    // Create a CANCELLATION_CHARGES breakup
    const cancellationBreakup: Breakup = {
      title: "CANCELLATION_CHARGES",
      price: {
        currency: "INR",
        value: cancellationCharges.toFixed(2),
      },
    };
  
    const newTotal = currentTotal - refundAmount + cancellationCharges;
  
    return {
      price: {
        ...quote.price,
        value: newTotal.toFixed(2),
      },
      breakup: [...quote.breakup, ...refundBreakups, cancellationBreakup],
    };
  }


  export async function onCancelGenerator(existingPayload: any,sessionData: SessionData){
    if (sessionData.updated_payments.length > 0) {
      existingPayload.message.order.payments = sessionData.updated_payments;
      }
    
    if (sessionData.items.length > 0) {
    existingPayload.message.order.items = sessionData.items;
    }
  
    if (sessionData.fulfillments.length > 0) {
    existingPayload.message.order.fulfillments = sessionData.fulfillments;
    existingPayload.message.order = stripTicketAuthorizations(existingPayload.message.order)
    }
    if (sessionData.order_id) {
    existingPayload.message.order.id = sessionData.order_id;
    }
    existingPayload.message.order.status = "CANCELLED"
    if(sessionData.quote != null){
    existingPayload.message.order.quote = applyCancellation(sessionData.quote,15)
    }
    existingPayload.message.order = updateSettlementAmount(existingPayload.message.order, sessionData);
    const now = new Date().toISOString();
    existingPayload.message.order.created_at = sessionData.created_at
    existingPayload.message.order.updated_at = now
    return existingPayload;
}