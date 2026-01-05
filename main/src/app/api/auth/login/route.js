import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../..//lib/db';
import User from '../../../models/User';
import { createSession } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    await connectDB();

    const user = await User.findOne({ email });
    
    // 1. Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // 2. *** NEW CHECK ***: Is this a Google User?
    if (user.authProvider === 'google') {
      return NextResponse.json({ 
        // This is the message your frontend will display in the red box
        error: "This email is linked to Google. Please use 'Sign in with Google'." 
      }, { status: 400 });
    }

    // 3. Normal Password Check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // 4. Verification Check
    if (!user.isVerified) {
      return NextResponse.json({ error: "Please verify your email first" }, { status: 403 });
    }

    // 5. Success
    await createSession(user._id);

    return NextResponse.json({ 
      message: "Login successful",
      redirectUrl: "/dashboard" 
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}