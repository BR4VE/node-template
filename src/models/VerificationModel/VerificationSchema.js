import mongoose from "mongoose";

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const VerificationSchema = Schema(
  {
    code: { type: String, required: true },
    expireAt: { type: Date, required: true },
    type: {
      type: String,
      enum: ["email", "password", "phone"],
      required: true,
    },
    verified: { type: Boolean, default: false },
    verifiedAt: Date,
    userId: { type: ObjectId, required: true, index: true },
  },
  { timestamps: true }
);

export default { name: "Verification", target: VerificationSchema };
