import { SessionData } from "../../../../session-types";



export async function updateEndStopGenerator(existingPayload: any,sessionData: SessionData){
  
	if (sessionData.update_1_fulfillments) {
	existingPayload.message.order.fulfillments = [sessionData.update_1_fulfillments];
	}
	if (sessionData.order_id) {
	existingPayload.message.order.id = sessionData.order_id;
	}
	
 
    return existingPayload;
}