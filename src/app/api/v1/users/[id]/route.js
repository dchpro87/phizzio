import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function GET(req, { params }) {
  const session = await getServerSession({ req, authOptions });
  if (!session) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      },
      { status: 401 }
    );
  }

  // const userId = 12345;
  const userId = params?.id;

  await dbConnect();
  try {
    const user = await User.findById(userId);

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

export async function PATCH(req, res, { params }) {
  const session = await getServerSession({ req, res, authOptions });
  if (!session) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      },
      { status: 401 }
    );
  }

  const body = await req.json();
  const options = { returnDocument: 'after' };

  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(params.id, body, options);

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
