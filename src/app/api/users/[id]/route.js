import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const { firstname, lastname, email, profileImage } = body;

    await client.connect();
    const db = client.db("wad-01");
    const users = db.collection("user");

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstname,
          lastname,
          email,
          profileImage, 
        },
      }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "User updated" });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await client.connect();
    const db = client.db("wad-01");
    const users = db.collection("user");

    const result = await users.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
