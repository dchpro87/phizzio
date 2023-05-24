import { NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/lib/utils';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';
import { incrementUserActivety } from '@/lib/incrementUserActivety';

export async function POST(req) {
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

    const client = await Client.create(body);
    await incrementUserActivety(userId);

    return NextResponse.json(client, { status: 201 });
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

    const client = await Client.findOneAndUpdate({ _id: body.clientId }, body);

    if (!client) throw new Error('Client not found!');

    return NextResponse.json(client, { status: 200 });
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
  const clientId = searchParams.get('clientId');

  await dbConnect();

  try {
    const userId = await getUserIdFromToken(req);
    await incrementUserActivety(userId);

    const client = await Client.findOneAndDelete({ _id: clientId });

    if (!client) throw new Error('Client not found!');

    return NextResponse.json(client, { status: 200 });
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
