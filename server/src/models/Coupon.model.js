import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },

    minPurchase: {
      type: Number,
      default: 0,
    },

    maxDiscount: {
      type: Number,
      default: null,
    },

    usageLimit: {
      type: Number,
      required: true,
    },

    used: {
      type: Number,
      default: 0,
    },

    perUserLimit: {
      type: Number,
      default: 1,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "expired", "disabled"],
      default: "active",
    },

    description: {
      type: String,
    },
  },
  { timestamps: true },
);

// 🔥 helper: check if coupon is valid
couponSchema.methods.isValid = function () {
  const now = new Date();

  return (
    this.status === "active" &&
    now >= this.startDate &&
    now <= this.endDate &&
    this.used < this.usageLimit
  );
};

export default mongoose.model("Coupon", couponSchema);
