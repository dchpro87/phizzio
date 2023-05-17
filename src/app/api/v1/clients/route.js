import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';
import { getAll } from '@/lib/handlerFactory';

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

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const clients = await Client.find();
    if (!clients) throw new Error('No clients found');

    return NextResponse.json(clients, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'fail',
        message: err.message,
      },
      { status: 404 }
    );
  }
}
