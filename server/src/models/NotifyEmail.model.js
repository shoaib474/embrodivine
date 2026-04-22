// models/NotifyEmail.js
import mongoose from "mongoose";

const notifyEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // prevents duplicates at DB level
    },
    notifyStatus: {
      type: String,
      enum: ["pending", "contacted"], // you can expand later
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("NotifyEmail", notifyEmailSchema);
