import { NextResponse, NextRequest } from 'next/server';
import { getAll } from '@/lib/handlerFactory';

import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';

export async function GET(request, response) {
  //  get userid from parth params
  const { userId } = response.params;

  //  get query params from url
  const { searchParams } = new URL(request.url);

  //  convert query params to object
  const queryParams = Object.fromEntries(searchParams.entries());

  await dbConnect();

  try {
    // const clients = await Client.getAll({ userId, ...queryParams });

    const clients = await Client.find({ userId });

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
