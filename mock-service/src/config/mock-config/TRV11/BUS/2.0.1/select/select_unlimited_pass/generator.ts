import { SessionData } from "../../../../session-types";



export async function selectGenerator(existingPayload: any, sessionData: SessionData) {
	
	existingPayload.message.order.fulfillments.forEach((fulfillment:any)=>{
		fulfillment.customer.person.creds[0].id =(sessionData.user_inputs?.pan_id)
	})
	existingPayload.message.order.items.forEach((item: any) => {
		const count = parseInt(sessionData.user_inputs?.item_count, 10) || 1;
		item.quantity.selected.count =count;
	  });	
	  

	return existingPayload;
}
