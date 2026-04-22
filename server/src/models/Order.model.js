import mongoose, { modelNames } from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    downloadUrl: {
      type: String, // e.g. "dragon-patch-design.dst"
      required: false,
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: {
      type: String,
      unique: true,
    },
    paypalOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    items: [orderItemSchema],

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },

    amount: {
      type: Number,
      required: true,
    },

    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    downloadable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
