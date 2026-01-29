import { randomBytes } from "crypto";
import { SessionData } from "../../../../session-types";
function enhancePayments(payments:any) {
	const additionalParams = {
	  bank_code: "XXXXXXXX",
	  bank_account_number: "xxxxxxxxxxxxxx",
	};
  
	return payments.map((payment:any) => ({
	  ...payment,
	  params: {
		...payment.params,
		...additionalParams
	  }
	}));
  }

function updateOrderTimestamps(payload: any) {
	const now = new Date().toISOString();
	if (payload.message.order) {
	  payload.message.order.created_at = now;
	  payload.message.order.updated_at = now;
	}
	return payload;
  }

export async function onConfirmGenerator(
	existingPayload: any,
	sessionData: SessionData
) {
	const randomId = Math.random().toString(36).substring(2, 15);
	const order_id = randomId;
	existingPayload.message.order.payments = enhancePayments(sessionData.updated_payments)
	
	  // Check if items is a non-empty array
	if (sessionData.items.length > 0) {
	existingPayload.message.order.items = sessionData.items;
	}

	// Check if fulfillments is a non-empty array
	if (sessionData.fulfillments.length > 0) {
	existingPayload.message.order.fulfillments = sessionData.fulfillments;
	}
	if(sessionData.quote != null){
	existingPayload.message.order.quote = sessionData.quote
	}
	existingPayload.message.order.id = order_id;
	existingPayload = updateOrderTimestamps(existingPayload)
	return existingPayload;
}

