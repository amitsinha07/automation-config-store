

export async function statusTechCancelGenerator(existingPayload: any,sessionData: any){
    if(sessionData.transaction_id){
        existingPayload.message.ref_id = sessionData?.transaction_id ?? "123456789"
    }
    return existingPayload;
}