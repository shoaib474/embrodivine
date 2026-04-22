// models/Quote.js
import mongoose from "mongoose";
import validator from "validator";

const quoteSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Customer name must be at least 2 characters"],
      maxlength: [50, "Customer name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any");
        },
        message: "Please enter a valid phone number",
      },
    },

    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: {
        values: [
          "Custom Patch",
          "Embroidery",
          "Digitizing",
          "Chenille Patch",
          "PVC Patch",
          "Woven Patch",
          "Other",
        ],
        message: "Invalid project type",
      },
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [100000, "Quantity exceeds allowed limit"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be less than 1000 characters"],
    },

    budget: {
      type: String,
      trim: true,
      maxlength: [50, "Budget description too long"],
    },

    size: {
      type: String,
      trim: true,
      maxlength: [50, "Size description too long"],
    },

    timeline: {
      type: Date,
      required: [true, "timeline is required"],
      validate: {
        validator: function (value) {
          return validator.isAfter(
            value.toISOString(),
            new Date().toISOString()
          );
        },
        message: "Deadline must be a future date",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "completed","quoted"],
        message: "Invalid status",
      },
      default: "pending",
    },

    colors: {
      type: [String],
      trim: true,
      validate: {
        validator: function (value) {
          return value.length <= 10; // max 10 colors
        },
        message: "You can select a maximum of 10 colors",
      },
    },

    attachments: {
      type: [
        {
          url: {
            type: String,
            required: true,
            validate: {
              validator: (v) => validator.isURL(v),
              message: (props) => `${props.value} is not a valid URL`,
            },
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      ],
      default: [], // <- Add this
      validate: {
        validator: function (files) {
          return files.length <= 5;
        },
        message: "You can upload a maximum of 5 attachments",
      },
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
