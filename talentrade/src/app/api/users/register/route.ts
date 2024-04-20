import { connectToDatabase } from '../../../../../lib';
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: string; // Ensure picture property is always present
  services: string[];
  credit: number;
  rating: number;
  peopleHelped: number;
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    let { firstname, lastname, email, password, picture } = data as UserData;



    // Assign default values
    const services: string[] = [];
    const credit = 0;
    const rating = 0;
    const peopleHelped = 0;
    const defaultPicture = "/default.png"; // Default picture path

    const { db } = await connectToDatabase();

    const userCollection = db.collection("users");

    const check = await userCollection.findOne({ email: email });
    if (check)
      return new NextResponse(JSON.stringify({ error: "4.9", message: "User already exists" }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });

    const hash = await bcrypt.hash(password, 10);

    password = hash;
    // Set picture to default if not provided
    const userData: UserData = {
      firstname,
      lastname,
      email,
      password,
      picture: picture || defaultPicture, // Set picture to default if not provided
      services,
      credit,
      rating,
      peopleHelped
    };

    // Insert user data into the database
    const user = await userCollection.insertOne(userData);

    // Return success response
    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Handle errors
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
