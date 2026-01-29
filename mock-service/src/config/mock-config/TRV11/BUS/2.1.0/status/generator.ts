export async function statusPurchaseFlowGenerator(existingPayload: any,sessionData: any){
    if(sessionData.transaction_id){
        existingPayload.message.order_id = sessionData.order_id
    }
    return existingPayload;
}