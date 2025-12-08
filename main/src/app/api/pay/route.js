import { NextResponse } from 'next/server';
import { phonePe } from '../../../lib/phonepe'; // Import the initialized client
import { StandardCheckoutPayRequest } from 'pg-sdk-node';

export async function POST(req) {
  if (!phonePe) {
    return NextResponse.json({ success: false, message: 'Payment gateway not initialized' }, { status: 500 });
  }

  try {
    // 1. **Input Validation:** Get validated data from the client
    const { orderId, amount, userId } = await req.json(); 

    // 2. **Build the Request:** Use the SDK method
    const request = StandardCheckoutPayRequest.build_request({
      merchantOrderId: orderId, // Your unique order ID
      amount: amount * 100, // Amount in paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-redirect`,
      redirectMode: 'REDIRECT', // As specified in docs
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/phonepe`, // Your webhook handler
      // Add other required fields like: 
      // merchantUserId: userId
    });

    // 3. **Initiate Payment via SDK:** This securely handles hashing and API call
    const response = await phonePe.pay(request);

    if (response.success && response.data.instrumentResponse.redirectInfo.url) {
        return NextResponse.json({ 
            success: true, 
            redirectUrl: response.data.instrumentResponse.redirectInfo.url 
        }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: 'Payment initiation failed' }, { status: 500 });

  } catch (error) {
    console.error('PhonePe Initiation Error:', error);
    // 8. **Exception Handling:** Use the PhonePeException class if necessary 
    // to gracefully handle errors, as per the documentation.
    return NextResponse.json({ success: false, message: 'Server error during payment initiation' }, { status: 500 });
  }
}