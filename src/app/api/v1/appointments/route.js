import { NextResponse } from 'next/server';

import { incrementUserActivety } from '@/lib/incrementUserActivety';
import { getUserIdFromToken } from '@/lib/utils';

import dbConnect from '@/lib/dbConnect';
import { getAll } from '@/lib/handlerFactory';
import Appointment from '@/models/appointmentModel';

export async function POST(req) {
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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const queryStr = Object.fromEntries(searchParams);

  try {
    const appointments = await getAll(Appointment, queryStr);
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

export async function PATCH(req) {
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
  const { searchParams } = new URL(req.url);
  const appointmentId = searchParams.get('appointmentId');

  await dbConnect();

  try {
    const userId = await getUserIdFromToken(req);
    await incrementUserActivety(userId);

    const appointment = await Appointment.findOneAndDelete({ _id: appointmentId });

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
