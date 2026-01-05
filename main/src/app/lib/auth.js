import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// 1. Make this function async
export const createSession = async (userId) => {
  const token = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '30d' }
  );

  // 2. Await the cookies() function
  const cookieStore = await cookies();
  
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60,
    sameSite: 'strict',
    path: '/',
  });

  return token;
};