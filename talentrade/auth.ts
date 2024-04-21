import jwt from 'jsonwebtoken';
import { connectToDatabase } from './lib/index';
import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB queries
import { NextResponse } from "next/server";

const AUTH_KEY = process.env.AUTH_KEY;

const authMiddleware = async (req: any, res: any, next: any) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    console.log('No auth headers found');
    return res.sendStatus(403);
  }
  const token = authHeaders.split(' ')[1];
  console.log('Token:', token);

  try {
    if (!AUTH_KEY) {
      console.log('Authentication key is not defined');
      return new NextResponse(JSON.stringify({ error: "Authentication key is not defined" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify & decode token payload
    const decodedToken = jwt.verify(token, AUTH_KEY) as { _id: string };

    // Convert _id to ObjectId
    const userId = new ObjectId(decodedToken._id);
    console.log('Decoded User ID:', userId);

    // Connect to the database
    const { db } = await connectToDatabase();
    const userCollection = db.collection("users");

    // Attempt to find user object and set to req
    const user = await userCollection.findOne({ _id: userId });

    if (!user) {
      console.log('User not found');
      return res.sendStatus(401);
    }

    console.log('User:', user);
    req.user = user;
    next();
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(401);
  }
};

export default authMiddleware;
