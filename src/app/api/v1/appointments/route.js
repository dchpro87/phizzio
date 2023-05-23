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

  console.log(queryStr);

  try {
    const appointment = await getAll(Appointment, queryStr);
    const length = appointment.length;

    return NextResponse.json({ length, appointment }, { status: 200 });
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

// export async function PATCH(req) {
//   const body = await req.json();

//   await dbConnect();

//   try {
//     const userId = await getUserIdFromToken(req);
//     await incrementUserActivety(userId);

//     const client = await Client.findOneAndUpdate({ _id: body.clientId }, body);

//     if (!client) throw new Error('Client not found!');

//     return NextResponse.json(client, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(
//       {
//         status: 'fail',
//         message: err.message,
//       },
//       { status: 400 }
//     );
//   }
// }

// export async function DELETE(req) {
//   const { searchParams } = new URL(req.url);
//   const clientId = searchParams.get('clientId');

//   await dbConnect();

//   try {
//     const userId = await getUserIdFromToken(req);
//     await incrementUserActivety(userId);

//     const client = await Client.findOneAndDelete({ _id: clientId });

//     if (!client) throw new Error('Client not found!');

//     return NextResponse.json(client, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(
//       {
//         status: 'fail',
//         message: err.message,
//       },
//       { status: 400 }
//     );
//   }
// }
