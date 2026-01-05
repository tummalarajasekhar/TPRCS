import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { createSession } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.otp !== otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (new Date() > user.otpExpiry) return NextResponse.json({ error: "OTP has expired" }, { status: 400 });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // 3. Add 'await' here
    await createSession(user._id);

    return NextResponse.json({ 
      message: "Verified & Logged in",
      redirectUrl: "/dashboard" 
    }, { status: 200 });

  } catch (error) {
    console.error(error); // Helpful for debugging
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}