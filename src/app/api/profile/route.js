import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

const uploadPath = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, randomName + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter }).single("file");


export async function GET() {
  await dbConnect();
  const user = await User.findOne();
  return NextResponse.json(user);
}


export async function POST(req) {
  await dbConnect();

  return new Promise((resolve) => {
    upload(req, {}, async function (err) {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 400 })
        );
      }

      const { firstname, lastname, email } = req.body;
      const user = await User.findOne();

      if (req.file) {
        user.profileImage = req.file.filename;
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;

      await user.save();

      return resolve(
        NextResponse.json({ message: "Profile updated", user })
      );
    });
  });
}