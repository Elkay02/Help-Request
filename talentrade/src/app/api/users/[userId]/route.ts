import { connectToDatabase } from './../../../../../lib/index';
import { NextResponse } from "next/server";



export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const { db } = await connectToDatabase();
    const userCollection = db.collection("users");

    const users = await userCollection.find().toArray()
    console.log('GET ~ users:', users);
    const user = users.filter((user: { _id: { toString: () => any; }; }) => params.userId === user._id.toString());  // Example query
    console.log('GET ~ user:', user);


    return NextResponse.json(user);
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