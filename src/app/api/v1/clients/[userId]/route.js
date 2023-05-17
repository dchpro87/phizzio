import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';

export async function GET(req, { params }) {
  await dbConnect();
  console.log(params);

  try {
    const clients = await Client.find({ userId: params.userId });
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
