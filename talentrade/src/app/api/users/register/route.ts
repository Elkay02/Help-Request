import { connectToDatabase } from './../../../../../lib/index';
import { NextResponse } from "next/server";



export async function POST(req: any) {
  try {
    const rawBody = await req.body.text();  // Read all chunks
    const { firstName, lastName, email, password } = JSON.parse(rawBody);
    console.log('POST ~ req.body:', rawBody);
    console.log(firstName, lastName, email, password);
    const { db } = await connectToDatabase();

    const data = await db.collection("users").insertOne({ firstName, lastName, email, password });  // Example query

    return NextResponse.json(data);
  } catch (error) {
    // Error handling
    return new NextResponse(JSON.stringify({ error: "Failed to connect to database" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}