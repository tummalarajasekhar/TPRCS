import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { sendEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const { email } = await request.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      // Security: We return 200 even if user doesn't exist to prevent email enumeration (hackers finding valid emails).
      // But for this project, let's be honest so you can debug easily.
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      text: `Your password reset code is: ${otp}`
    });

    return NextResponse.json({ message: "OTP sent" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}