import { SessionData } from "../../../../session-types";



export async function updateEndStopGenerator(existingPayload: any,sessionData: SessionData){
  
	if (sessionData.update_1_order) {
	existingPayload.message.order = sessionData?.update_1_order;
	}
	existingPayload.message.order.status= "CONFIRM_UPDATE"
	
 
    return existingPayload;
}