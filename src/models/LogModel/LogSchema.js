import mongoose from "mongoose";

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const LogSchema = Schema(
  {
    ip: { type: String, default: null, index: true },
    message: { type: String, default: null },
    path: { type: String, default: null, index: true },
    type: { type: String, enum: ["action", "request"], required: true },
    userId: { type: ObjectId, default: null, index: true },
  },
  { timestamps: true }
);

export default { name: "Log", target: LogSchema };
