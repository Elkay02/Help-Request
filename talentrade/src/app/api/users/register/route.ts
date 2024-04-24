import { connectToDatabase } from '../../../../../lib';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const AUTH_KEY = process.env.AUTH_KEY;

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: string; // Ensure picture property is always present
  services: string[];
  description: string;
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
    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ut eveniet commodi eaque doloremque quia non nesciunt veniam unde rerum. Consequuntur pariatur minus sequi neque sit et, eos possimus quam."
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
      description,
      credit,
      rating,
      peopleHelped
    };

    // Insert user data into the database
    const user = await userCollection.insertOne(userData);

    // const { _id } = await user.save();

    if (!AUTH_KEY) {
      return new NextResponse(JSON.stringify({ error: "Authentication key is not defined" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const accessToken = jwt.sign({ _id: user.insertedId }, AUTH_KEY);

    return new NextResponse(JSON.stringify({ accessToken }), {
      status: 201
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
