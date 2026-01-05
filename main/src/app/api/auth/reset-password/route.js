import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/db';
import User from '../../../models/User';

export async function POST(request) {
  try {
    const { email, otp, newPassword } = await request.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Validate OTP
    if (user.otp !== otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    if (new Date() > user.otpExpiry) return NextResponse.json({ error: "OTP expired" }, { status: 400 });

    // Hash New Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update User
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}