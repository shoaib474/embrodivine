import mongoose from "mongoose";
import validator from "validator";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [50, "Full name must be less than 50 characters"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => !v || validator.isEmail(v),
        message: "Invalid email address",
      },
    },

    avatar: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: "Avatar must be a valid URL",
      },
    },

    phone: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v, "any"),
        message: "Invalid phone number",
      },
    },

    dateOfBirth: {
      type: Date,
      validate: {
        validator: (v) => !v || v < new Date(),
        message: "Date of birth must be in the past",
      },
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female","prefer not to say", "other"],
        message: "Gender must be male, female, or other",
      },
      default: null,
    },

    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name too long"],
    },

    address: {
      type: String,
      trim: true,
      maxlength: [200, "Address too long"],
    },

    city: {
      type: String,
      trim: true,
      maxlength: [50, "City name too long"],
    },

    state: {
      type: String,
      trim: true,
      maxlength: [50, "State name too long"],
    },

    zipCode: {
      type: String,
      validate: {
        validator: (v) => !v || validator.isPostalCode(v, "any"),
        message: "Invalid zip code",
      },
    },

    country: {
      type: String,
      trim: true,
      maxlength: [50, "Country name too long"],
    },

    bio: {
      type: String,
      maxlength: [300, "Bio must be under 300 characters"],
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
