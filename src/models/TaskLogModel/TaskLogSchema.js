import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskLogSchema = Schema(
  {
    lastExecution: { type: Date, default: null },
    name: { type: String, required: true },
    occupied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TaskLogIndexes = [
  {
    fields: {
      name: 1,
      lastExecution: 1,
    },
    options: { unique: true },
  },
];

export default {
  indexes: TaskLogIndexes,
  name: "TaskLog",
  target: TaskLogSchema,
};
