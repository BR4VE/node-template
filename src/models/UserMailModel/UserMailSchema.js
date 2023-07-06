import mongoose from "mongoose";

const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const UserMailSchema = Schema(
  {
    data: {
      notificationGroupId: { type: ObjectId, default: null },
    },
    email: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: ObjectId, required: true },
  },
  { timestamps: true }
);

export default { name: "UserMail", target: UserMailSchema };
