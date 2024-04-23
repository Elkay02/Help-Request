import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../lib/index';
import { NextResponse } from "next/server";


export async function PUT(req: Request, context: any) {
  try {
    const { params } = context;
    const { db } = await connectToDatabase();
    const messageCollection = db.collection("messages");

    const messageId = new ObjectId(params.messageId);


    const updatedMessage = await messageCollection.findOneAndUpdate(
      { _id: messageId },
      { $set: { state: 'accepted' } },
      { returnOriginal: false }
    );

    return new NextResponse(JSON.stringify(updatedMessage), {
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

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;
    const { db } = await connectToDatabase();
    const messageCollection = db.collection("messages");

    const messageId = new ObjectId(params.messageId);

    // Update the array field using $push
    const deleteddMessage = await messageCollection.deleteOne(
      { _id: messageId }
    );


    return new NextResponse(JSON.stringify(deleteddMessage), {
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