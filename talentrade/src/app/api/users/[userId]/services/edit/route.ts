import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../../../lib/index';
import { NextResponse } from "next/server";

interface Service {
  service: string;
  // tags: string[];
}

export async function PUT(req: Request, context: any) {
  try {
    const data = await req.json()
    const { params } = context;

    const { service, index } = data;

    const { db } = await connectToDatabase();

    const userCollection = db.collection("users");
    const serviceCollection = db.collection("services");

    // Convert params.userId to ObjectId
    const userId = new ObjectId(params.userId);

    // Update the array field using $push
    const originalService = await userCollection.findOne(
      { _id: userId },
      { projection: { services: { $slice: [index, 1] } } }
    );

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $set: { [`services.${index}`]: service } },
      { returnOriginal: false } // To return the updated document
    );

    console.log('PUT ~ originalService:', originalService.services[0]);
    const updatedService = await serviceCollection.findOneAndUpdate(
      { service: originalService.services[0] },
      { $pull: { users: userId } },
      { returnOriginal: false } // To return the updated document
    );

    const isService = await serviceCollection.findOne({ service: service })
    console.log('PUT ~ isService:', isService);

    if (isService) {
      console.log('PUT ~ isService passed');
      const updateService = await serviceCollection.findOneAndUpdate(
        { service: service },
        { $push: { users: userId } },
        { returnOriginal: false }
      )
      console.log('PUT ~ isService:', updateService);
      return new NextResponse(JSON.stringify(updateService), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const newService = await serviceCollection.insertOne(
        { service: service, users: [userId] }
      );
      return new NextResponse(JSON.stringify(newService), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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