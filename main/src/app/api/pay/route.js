import { NextResponse } from 'next/server';
import { createPhonePeOrder } from './phonepe'; // Import the initialized client


export async function POST(req) {
  if (!createPhonePeOrder) {
    return NextResponse.json({ success: false, message: 'Payment gateway not initialized' }, { status: 500 });
  }
  // return NextResponse.json({ 
  //           success: true, 
  //           redirectUrl: "tprcs.com"
  //       }, { status: 200 });

  try {
    // 1. **Input Validation:** Get validated data from the client
    const { orderId, amount, userId } = await req.json(); 

    // 2. **Build the Request:** Use the SDK method
    // const request = StandardCheckoutPayRequest.build_request({
    //   merchantOrderId: orderId, // Your unique order ID
    //   amount: amount * 100, // Amount in paise
    //   redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-redirect`,
     
    // });

    // 3. **Initiate Payment via SDK:** This securely handles hashing and API call
    const response = await createPhonePeOrder(orderId, amount, userId);
    console.log("PhonePe Response:", response);

    if (response && response.redirectUrl) {
        return NextResponse.json({ 
            success: true, 
            redirectUrl: response.redirectUrl
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