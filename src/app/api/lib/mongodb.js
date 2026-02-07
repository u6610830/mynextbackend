import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

export async function connectMongoDB() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(MONGODB_URI);
}
