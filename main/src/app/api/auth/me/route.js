import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Optional: Verify token signature if you want to be extra strict
        jwt.verify(token.value, process.env.JWT_SECRET);

        return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}