import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import { createSession } from '../../../../lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  try {
    // 1. Exchange Code for Tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    if (!tokens.access_token) throw new Error("Failed to retrieve access token");

    // 2. Get User Info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const googleUser = await userResponse.json();

    await connectDB();

    // 3. Find or Create User
    let user = await User.findOne({ email: googleUser.email });

    if (user) {
        // If they exist but provider is 'email', we can either:
        // A) Block them (strict security)
        // B) Allow it (update provider to google? or just let them in)
        // For now, let's just ensure they are verified since Google verifies emails.
        if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }
    } else {
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        
        user = await User.create({
            fullName: googleUser.name,
            email: googleUser.email,
            password: randomPassword,
            authProvider: 'google', // <--- Set as Google User
            isVerified: true,
        });
    }

    // 4. Create Session
    await createSession(user._id);

    return NextResponse.redirect(new URL('/training/dashboard', request.url));

  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.redirect(new URL('/login?error=GoogleAuthFailed', request.url));
  }
}