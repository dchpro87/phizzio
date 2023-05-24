import { NextResponse, NextRequest } from 'next/server';
import { getAll } from '@/lib/handlerFactory';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Client from '@/models/clientModel';

export async function GET(req, response) {
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
  //  get userid from path params
  const { userId } = response.params;

  //  get query params from url
  const { searchParams } = new URL(req.url);

  //  convert query searchParams object to POJO
  const queryParams = Object.fromEntries(searchParams.entries());

  await dbConnect();
  try {
    const clients = await getAll(Client, { userId, ...queryParams });

    if (!clients) throw new Error('No clients found');

    return NextResponse.json(
      { length: clients.length, clients },
      { status: 200 }
    );
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
