import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import UserComment from '@/models/userCommentModel';
// import { getUserIdFromToken } from '@/lib/utils';

export async function POST(nextRequest) {
  const body = await nextRequest.json();

  await dbConnect();

  try {
    await UserComment.create(body);
  } catch (err) {
    console.log(err.message);

    return NextResponse.json(
      {
        status: 'fail',
        message: err.message,
      },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      status: 'success',
      message: 'Comment sent successfully!',
    },
    {
      status: 201,
    }
  );
}
