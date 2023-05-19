import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';

export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  try {
    const client = await Client.create(body);

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
  const body = await req.json();

  await dbConnect();

  try {
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

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  await dbConnect();

  try {
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
