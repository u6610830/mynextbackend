import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db();

  const total = await db.collection("items").countDocuments();
  const data = await db
    .collection("items")
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  return NextResponse.json({ page, limit, total, data });
}

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("items").insertOne(body);

  return NextResponse.json({ _id: result.insertedId, ...body });
}
