import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { getAll } from '@/lib/handlerFactory';
import dbConnect from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';

export async function GET(req, response) {
  const session = await getServerSession({
    req,
    res: NextResponse,
    authOptions,
  });

  if (!session) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      },
      { status: 401 }
    );
  }
  const { userId } = response.params;
  const { searchParams } = new URL(req.url);
  const queryStr = Object.fromEntries(searchParams);

  await dbConnect();
  try {
    const appointments = await getAll(Appointment, { userId, ...queryStr });
    const length = appointments.length;

    return NextResponse.json({ length, appointments }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'fail',
        message: err.message,
      },
      { status: 400 }
    );
  }
}
