export async function statusDefaultGenerator(existingPayload: any, sessionData: any) {
  if(sessionData.order_id){
    existingPayload.message.order_id = sessionData.order_id;
  }

<<<<<<< HEAD
  if (sessionData.flow_id === "technical_cancellation" || sessionData.flow_id === "technical_cancellation_with_form") {
=======
  if (sessionData.flow_id === "technical_cancellation") {
>>>>>>> fc654ab8cb9c3095a107d3c7fd522305cab92ffc
    existingPayload.message = {
      ref_id: existingPayload?.context?.transaction_id ?? crypto.randomUUID(),
    };
  }
  return existingPayload;} 