import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password, passwordConfirm } = await req.json();

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return new Response(
      'Invalid input - password should also be at least 7 characters long.',
      {
        status: 422,
      }
    );
  }

  if (password !== passwordConfirm) {
    return new Response('Passwords do not match.', {
      status: 422,
    });
  }

  const data = {
    status: 'success',
    message: 'Hello from the server!',
  };

  return NextResponse.json(data);
}
