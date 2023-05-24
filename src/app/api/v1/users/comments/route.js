import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import UserComment from '@/models/userCommentModel';

export async function POST(nextRequest) {
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
