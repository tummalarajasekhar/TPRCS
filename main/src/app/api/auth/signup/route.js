import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { sendEmail } from '../../../lib/email';

export async function POST(request) {
  try {
    const { fullName, email, password } = await request.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    
    // If user exists and used Google, tell them to use Google
    if (existingUser && existingUser.authProvider === 'google') {
       return NextResponse.json({ error: "Please sign in with Google" }, { status: 400 });
    }

    if (existingUser && existingUser.isVerified) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (existingUser) {
        existingUser.password = hashedPassword;
        existingUser.fullName = fullName;
        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;
        existingUser.authProvider = 'email'; // Reset provider if they retry manual signup
        await existingUser.save();
    } else {
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            authProvider: 'email', // <--- Set as Email User
            otp,
            otpExpiry,
            isVerified: false
        });
    }

    await sendEmail({
        to: email,
        subject: "Your Signup OTP",
        text: `Your verification code is: ${otp}`
    });

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}