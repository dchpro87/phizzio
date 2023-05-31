import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { incrementUserActivety } from '@/lib/incrementUserActivety';
import { getUserIdFromToken } from '@/lib/utils';

import dbConnect from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';

export async function POST(req) {
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

  const body = await req.json();

  await dbConnect();
  try {
    const userId = await getUserIdFromToken(req);
    const appointment = await Appointment.create(body);

    await incrementUserActivety(userId);

    return NextResponse.json(appointment, { status: 201 });
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

export async function PATCH(req) {
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

  const body = await req.json();

  await dbConnect();
  try {
    const userId = await getUserIdFromToken(req);
    await incrementUserActivety(userId);

    const appointment = await Appointment.findOneAndUpdate(
      { _id: body.appointmentId },
      body
    );

    if (!appointment) throw new Error('Appointment not found!');

    return NextResponse.json(appointment, { status: 200 });
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

export async function DELETE(req) {
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

  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get('appointmentId');

  await dbConnect();
  try {
    const userId = await getUserIdFromToken(req);
    await incrementUserActivety(userId);

    const appointment = await Appointment.findOneAndDelete({
      _id: appointmentId,
    });

    if (!appointment) throw new Error('Appointment not found!');

    return NextResponse.json(appointment, { status: 200 });
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
