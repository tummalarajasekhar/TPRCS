import { StandardCheckoutClient, Env, CreateSdkOrderRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
 
const clientId = "SU2512041401343875530747";       // Replace with your Sandbox Client ID
const clientSecret = "8ac1a286-aacc-4513-865c-0c601c1c897f"; // Replace with your Sandbox Secret
const clientVersion = 1;                           
const env = Env.PRODUCTION;     //change to Env.PRODUCTION when you go live
 
const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
 export async function createPhonePeOrder(orderId, amount, userId) {
const merchantOrderId = `O${orderId}-U${userId}-C${randomUUID()}`; //randomUUID();
console.log("Generated Merchant Order ID:", merchantOrderId);
const redirectUrl = "https://www.tprcs.com/mern-training";
 console.log("Redirect URL:", redirectUrl); 
const request = await CreateSdkOrderRequest.StandardCheckoutBuilder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .redirectUrl(redirectUrl)
        .build();
 console.log("Created PhonePe Order Request:", request);
// client.createSdkOrder(request).then((response) => {
//     const token = response.token
    
// })
return await client.pay(request);  
 }
