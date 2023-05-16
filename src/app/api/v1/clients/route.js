import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';

export async function PUT(req) {
  const data = await req.json();

  await dbConnect();

  try {
    const client = await Client.create(data);

    return NextResponse.json(client);
  } catch (err) {
    return NextResponse.json({
      status: 'fail',
      message: err.message,
    });
  }
}
