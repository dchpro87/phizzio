import { NextResponse } from 'next/server';

export async function POST(req, res) {
  console.log('💥💥');
  console.log(req.body);
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //     body: JSON.stringify({ time: new Date().toISOString() }),
  //   });

  //   const data = await res.json();
  const data = {
    status: 'success',
    message: 'Hello from the server!',
  };

  return NextResponse.json(data);
}
