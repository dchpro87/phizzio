import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function GET(req, { params }) {
  const token = await getToken({ req });

  await dbConnect();
  try {
    if (token?.sub !== params.id) {
      throw new Error('You are not authorized to perform this action.');
    }

    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({
      status: 'fail',
      message: 'User not found.',
    });
  }
}

export async function PATCH(req, { params }) {
  const token = await getToken({ req });

  const data = await req.json();
  await dbConnect();
  const options = { returnDocument: 'after' };
  try {
    if (token?.sub !== params.id) {
      throw new Error('You are not authorized to perform this action.');
    }

    const user = await User.findByIdAndUpdate(params.id, data, options);

    if (!user) {
      return NextResponse.json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({
      status: 'fail',
      message: 'User not found.',
    });
  }
}
