import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection("items").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: body }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db();

  await db.collection("items").deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({ success: true });
}
