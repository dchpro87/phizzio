import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function GET(req, { params }) {
  const token = await getToken({ req });

  await dbConnect();
  try {
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
