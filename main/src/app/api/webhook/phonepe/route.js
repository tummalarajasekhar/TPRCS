import { NextResponse } from 'next/server';
import { getPhonePeClient } from '@/lib/phonepe'; 
import { headers } from 'next/headers';

// Important: Next.js must not parse the body automatically for webhooks
export const dynamic = 'force-dynamic'; 

export async function POST(req) {
  try {
    const phonePeClient = getPhonePeClient();
    
    // Get raw body and security header
    const rawBody = await req.text(); 
    const authorizationHeader = headers().get('Authorization'); 
    
    const username = process.env.MERCHANT_CALLBACK_USERNAME;
    const password = process.env.MERCHANT_CALLBACK_PASSWORD;

    // 1. **CRITICAL SECURITY STEP: Validate Callback using SDK**
    // This verifies the hash and authenticity of the payload.
    const callbackResponse = await phonePeClient.validateCallback(
        username,
        password,
        authorizationHeader,
        rawBody
    );
    
    // 2. Process the validated response
    if (callbackResponse.isValid) {
        const orderDetails = callbackResponse.payload; // Use .payload as suggested by docs
        const eventType = callbackResponse.type;

        if (eventType === 'PG_ORDER_COMPLETED' && orderDetails.state === 'COMPLETED') {
             // **FULFILL ORDER LOGIC HERE**
             // Use orderDetails.merchantOrderId to look up and update your database
             console.log(`✅ Webhook SUCCESS for order: ${orderDetails.merchantOrderId}`);
             // Example: await updateOrderStatus(orderDetails.merchantOrderId, 'COMPLETED');
        } else if (eventType === 'PG_ORDER_FAILED') {
             console.log(`❌ Webhook FAILED for order: ${orderDetails.merchantOrderId}`);
             // Example: await updateOrderStatus(orderDetails.merchantOrderId, 'FAILED');
        }
        
        // Respond 200 OK to acknowledge receipt of the callback
        return NextResponse.json({ success: true, message: 'Callback verified and processed' }, { status: 200 });

    } else {
        console.error('❌ Callback verification failed via SDK (Invalid Hash/Auth).');
        return NextResponse.json({ success: false, message: 'Unauthorized Callback' }, { status: 401 });
    }

  } catch (error) {
    console.error('PhonePe Webhook Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// Next.js App Router specific configuration to avoid body parsing
// You may also need to explicitly configure this for specific hosting environments.