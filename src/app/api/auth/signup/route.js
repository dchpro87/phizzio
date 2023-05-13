import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function POST(nextRequest) {
  const { name, email, password, passwordConfirm } = await nextRequest.json();
  // console.log({ name, email, password, passwordConfirm });

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 8
  ) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'Password should also be at least 8 characters long.',
      },
      {
        status: 422,
      }
    );
  }

  if (password !== passwordConfirm) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'Passwords do not match.',
      },
      {
        status: 422,
      }
    );
  }

  //  create new user on mongodb
  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'User already exists.',
        },
        {
          status: 422,
        }
      );
    }

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    if (!newUser) throw new Error('Something went wrong!');
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        status: 'fail',
        message: err.message,
        message: 'Something went wrong!',
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      status: 'success',
      message: 'New user created successfully!',
    },
    {
      status: 201,
    }
  );
}
