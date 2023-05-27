import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { incrementUserActivety } from '@/lib/incrementUserActivety';
import { getUserIdFromToken } from '@/lib/utils';

import { getAll } from '@/lib/handlerFactory';
import dbConnect from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';
import Client from '@/models/clientModel';

export async function GET(req) {
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
  const queryStr = Object.fromEntries(searchParams);
  const { userId, year, month } = queryStr;

  const startDate = new Date(year, month - 1, 1); // month - 1 because month index starts from 0
  const endDate = new Date(year, month, 0);

  await dbConnect();
  try {
    const appointments = await Appointment.find({
      userId: userId,
      dateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (!appointments) {
      return NextResponse.json({
        Status: 'fail',
        message: 'No appointments found!',
      });
    }

    const clients = await Client.find({ userId: userId, active: true });

    console.log('Appointment', appointments);
    console.log('Clients', clients);

    //remove appointments with inactive clients

    return NextResponse.json(appointments, { status: 200 });
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
