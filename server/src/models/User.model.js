import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      validate: {
        validator: function (v) {
          return /^[A-Za-z ]+$/.test(v); // Only letters and spaces
        },
        message: props => `${props.value} is not a valid name!`,
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (v) {
          // Minimum 1 uppercase, 1 lowercase, 1 number
          return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v);
        },
        message: "Password must contain uppercase, lowercase, and a number",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
