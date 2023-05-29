import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import dbConnect from '@/lib/dbConnect';
import Appointment from '@/models/appointmentModel';

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

  //  GMT
  const startDate = new Date(year, month, '01');
  const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);
  await dbConnect();
  try {
    const allAppointments = await Appointment.find({
      userId: userId,
      dateTime: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (!allAppointments) {
      return NextResponse.json({
        Status: 'fail',
        message: 'No appointments found!',
      });
    }

    const appointments = allAppointments.filter(
      (appointment) => appointment.clientId
    );

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
