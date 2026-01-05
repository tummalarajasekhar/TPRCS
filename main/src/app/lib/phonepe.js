import { StandardCheckoutClient, Env, CreateSdkOrderRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';
 
const clientId = "SU2512041401343875530747";       // Replace with your Sandbox Client ID
const clientSecret = "8ac1a286-aacc-4513-865c-0c601c1c897f"; // Replace with your Sandbox Secret
const clientVersion = 1;                           
const env = Env.PRODUCTION;     //change to Env.PRODUCTION when you go live
 
const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
 
const merchantOrderId = randomUUID();
const amount = 1000;
const redirectUrl = "https://www.merchant.com/redirect";
 
const request = CreateSdkOrderRequest.StandardCheckoutBuilder()
        .merchantOrderId(merchantOrderId)
        .amount(amount)
        .redirectUrl(redirectUrl)
        .build();
 
client.createSdkOrder(request).then((response) => {
    const token = response.token
})