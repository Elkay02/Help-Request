import { connectToDatabase } from '../../../../../lib';
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AUTH_KEY = process.env.AUTH_KEY;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { db } = await connectToDatabase();
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email: email });
    if (!user) throw new Error("Email not found!");

    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error("Incorrect Password!");

    if (!AUTH_KEY) {
      return new NextResponse(JSON.stringify({ error: "Authentication key is not defined" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, AUTH_KEY);

    return new NextResponse(JSON.stringify({ accessToken }), {
      status: 201
    });
  } catch (error: any) {
    console.error('Error details:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to process the request", message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
