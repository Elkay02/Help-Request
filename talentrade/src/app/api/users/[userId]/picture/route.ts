import { ObjectId } from 'mongodb';
import { connectToDatabase } from './../../../../../../lib/index';
import { NextResponse } from "next/server";



export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const { db } = await connectToDatabase();
    const userCollection = db.collection("users");

    const userId = new ObjectId(params.userId);

    const user = await userCollection.findOne({ _id: userId })

    return NextResponse.json(user.picture);
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