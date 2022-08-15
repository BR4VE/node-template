import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = Schema(
  {
    email: { type: String, index: true, sparse: true, unique: true },
    imageUrl: String,
    name: { type: String, default: "" },
    password: String,
    phoneNumber: String,
    urlName: { type: String, index: true, required: true },
  },
  { timestamps: true }
);

export default { name: "User", target: UserSchema };
