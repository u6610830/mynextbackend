import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET() {
  await client.connect();
  const db = client.db("wad-01");
  const users = db.collection("user");

  const data = await users.find().toArray();
  return NextResponse.json(data);
}
