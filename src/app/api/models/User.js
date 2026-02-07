import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
