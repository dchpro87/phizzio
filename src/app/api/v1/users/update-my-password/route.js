import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function PATCH(req) {
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

  await dbConnect();
  try {
    const user = await User.findById(body.userId).select('+password');

    if (!user) throw new Error('User not found!');

    if (!(await user.correctPassword(body.passwordCurrent, user.password))) {
      throw new Error('Your current password is wrong!');
    }

    user.password = body.password;
    user.passwordConfirm = body.passwordConfirm;
    await user.save();

    return NextResponse.json({
      status: 'success',
      message: 'Password updated successfully.',
    });
  } catch (err) {
    return NextResponse.json({
      status: 'fail',
      message: err.message,
    });
  }
}
