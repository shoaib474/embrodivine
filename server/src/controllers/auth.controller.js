import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import Profile from "../models/Profile.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists! Please login.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await Profile.create({
      userId: newUser._id,
      name,
      email: normalizedEmail,
      avatar: "",
      phone: "",
      dateOfBirth: null,
      gender: null,
      company: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      bio: "",
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User are not exists! Please register.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      user,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  }
};

export const dashboardUser = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Welcome ${req.user.email} to your dashboard!`,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
