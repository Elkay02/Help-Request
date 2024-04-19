import { connectToDatabase } from '../../../../lib';
import { NextResponse } from "next/server";

interface UserData {
  request: string;
  senderId: string;
  receiverId: string;
}

export async function POST(req: Request) {
  try {
    const data = await req.json()


    const { request, senderId, receiverId } = data as UserData;

    const { db } = await connectToDatabase();

    const userCollection = db.collection("messages");
    const userData: UserData = { request, senderId, receiverId };

    const user = await userCollection.insertOne(userData);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: "Failed to process the request", message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Handle other types of errors if needed
      return new NextResponse(JSON.stringify({ error: "Failed to process the request" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection("messages").find().toArray();  // Example query

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: "Failed to process the request", message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Handle other types of errors if needed
      return new NextResponse(JSON.stringify({ error: "Failed to process the request" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}