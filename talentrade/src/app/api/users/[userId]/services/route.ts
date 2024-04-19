import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../../lib/index';
import { NextResponse } from "next/server";

interface Service {
  service: string;
  // tags: string[];
}

export async function PUT(req: Request, context: any) {
  try {
    const data = await req.json()
    const { params } = context;

    const { service } = data;
    console.log('PUT ~ service:', service);

    const { db } = await connectToDatabase();

    const userCollection = db.collection("users");

    // Convert params.userId to ObjectId
    const userId = new ObjectId(params.userId);

    // Update the array field using $push
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $push: { services: service } },
      { returnOriginal: false } // To return the updated document
    );

    return new NextResponse(JSON.stringify(updatedUser), {
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