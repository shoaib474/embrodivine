import mongoose from "mongoose";

import Profile from "../models/Profile.model.js";
import User from "../models/User.model.js";
import Order from "../models/Order.model.js";
import Favorite from "../models/Favorite.model.js";

// 🔹 Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        ...(profile ? profile._doc : {}),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// 🔹 Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      phone,
      dateOfBirth,
      gender,
      company,
      address,
      city,
      state,
      zipCode,
      country,
      bio,
    } = req.body;

    // ✅ Basic validation
    if (name !== undefined && name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    if (bio !== undefined && bio.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Bio cannot exceed 500 characters",
      });
    }

    if (phone !== undefined && !/^\+?[\d\s\-]{7,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    // ✅ Build update object — only defined fields update karo
    const updateFields = {};
    const fields = {
      name,
      phone,
      dateOfBirth,
      gender,
      company,
      address,
      city,
      state,
      zipCode,
      country,
      bio,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updateFields[key] = value;
    }

    // ✅ upsert: true — profile nahi hai toh create kar do
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// 🔹 Update Avatar (separate endpoint)
export const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ File upload middleware (multer/cloudinary) use karo
    // req.file multer se aata hai
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Cloudinary ya koi bhi storage use karo
    const avatarUrl = req.file.path; // cloudinary URL

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: { avatar: avatarUrl } },
      { new: true, upsert: true },
    );

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      avatar: profile.avatar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// 🔹 Delete Account
export const deleteAccount = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user.id;

    await Profile.findOneAndDelete({ userId }).session(session);
    await Favorite.deleteMany({ user: userId }).session(session);
    await Order.deleteMany({ user: userId }).session(session);

    const user = await User.findByIdAndDelete(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
