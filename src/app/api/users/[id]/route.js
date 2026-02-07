import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  await client.connect();
  const db = client.db("wad-01");
  const users = db.collection("user");

  await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  return NextResponse.json({ message: "User updated" });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await client.connect();
  const db = client.db("wad-01");
  const users = db.collection("user");

  await users.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ message: "User deleted" });
}
