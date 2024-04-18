import { connectToDatabase } from './../../../lib/index';
import { NextResponse } from "next/server";



export async function GET() {

  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("users").find().toArray();  // Example query

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