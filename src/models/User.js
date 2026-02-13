import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  status: String,
  profileImage: String,
});

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
