import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function PATCH(req) {
  const token = await getToken({ req });

  const body = await req.json();

  await dbConnect();

  try {
    if (token?.sub !== body.userId) {
      throw new Error('You are not authorized to perform this action.');
    }

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
