import { SessionData } from "../../../../session-types";

export function markTicketAuthorizationsClaimed(payload: any, claimedStatus = "CLAIMED") {
  const clone = (typeof structuredClone === "function")
    ? structuredClone(payload)
    : JSON.parse(JSON.stringify(payload));

  const fulfillments =
    clone?.message?.order?.fulfillments ??
    clone?.message?.fulfillments ??
    [];

  if (!Array.isArray(fulfillments)) return clone;

  for (const f of fulfillments) {
    if (!f) continue;
    const fType = (typeof f.type === "string") ? f.type.toUpperCase() : "";
    if (fType !== "TICKET") continue;

    if (!Array.isArray(f.stops)) continue;
    for (const stop of f.stops) {
      if (!stop) continue;
      if (!stop.authorization || typeof stop.authorization !== "object") {
        stop.authorization = { status: claimedStatus };
        continue;
      }
      stop.authorization.status = claimedStatus;
    }
  }

  return clone;
}

export async function onStatusActiveGenerator(existingPayload: any,sessionData: SessionData){
    if (sessionData.updated_payments.length > 0) {
		existingPayload.message.order.payments = sessionData.updated_payments;
	  }
	
	if (sessionData.items.length > 0) {
	existingPayload.message.order.items = sessionData.items;
	}
	if (sessionData.order_id) {
	existingPayload.message.order.id = sessionData.order_id;
	}
	if(sessionData.quote != null){
	existingPayload.message.order.quote = sessionData.quote
	}
	if (sessionData.fulfillments.length > 0) {
	existingPayload.message.order.fulfillments = sessionData.fulfillments;
	existingPayload = markTicketAuthorizationsClaimed(existingPayload, "CLAIMED");
	}
    existingPayload.message.order.status = "COMPLETED"
	const now = new Date().toISOString();
    existingPayload.message.order.created_at = sessionData.created_at
    existingPayload.message.order.updated_at = now
    return existingPayload;
}