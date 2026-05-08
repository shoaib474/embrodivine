import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import Profile from "../models/Profile.model.js";
import { redisClient } from "../config/redis.js";

/* =========================
   REGISTER USER (RATE LIMIT)
========================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const ip = req.ip;
    const key = `register_attempt_${ip}`;

    // 🔥 Rate limit check
    const attempts = await redisClient.get(key);
    if (attempts && Number(attempts) >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again later.",
      });
    }

    const newAttempts = await redisClient.incr(key);
    if (newAttempts === 1) {
      await redisClient.expire(key, 60 * 10); // 10 min window
    }

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

    // 🔥 Save session in Redis
    await redisClient.setEx(`session_${newUser._id}`, 60 * 60 * 24 * 2, token);

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
    res.status(500).json({
      message: "Something went wrong!",
      error: err.message,
    });
  }
};

/* =========================
   LOGIN USER (REDIS SECURITY)
========================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ip = req.ip;
    const blockKey = `login_block_${ip}`;
    const failKey = `login_fail_${ip}`;

    // 🚨 Block check
    const blocked = await redisClient.get(blockKey);
    if (blocked) {
      return res.status(429).json({
        success: false,
        message: "Too many failed attempts. Try later.",
      });
    }

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
        message: "User does not exist! Please register.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const fails = await redisClient.incr(failKey);
      await redisClient.expire(failKey, 60 * 15);

      if (fails >= 5) {
        await redisClient.setEx(blockKey, 60 * 15, "blocked");
      }

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" },
    );

    // 🔥 Store session in Redis
    await redisClient.setEx(`session_${user._id}`, 60 * 60 * 24 * 2, token);

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
    res.status(500).json({
      message: "Something went wrong!",
      error: err.message,
    });
  }
};

/* =========================
   DASHBOARD (CACHE ENABLED)
========================= */
export const dashboardUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `dashboard_${userId}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        source: "redis",
        user: JSON.parse(cached),
      });
    }

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(req.user));

    res.status(200).json({
      success: true,
      source: "db",
      message: `Welcome ${req.user.email}`,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

/* =========================
   LOGOUT USER
========================= */
export const logoutUser = async (req, res) => {
  try {
    // User check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user.",
      });
    }

    const userId = req.user.id;

    // Redis session delete
    if (redisClient?.isOpen) {
      await redisClient.del(`session_${userId}`);
    }

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully!",
    });
  } catch (err) {
    console.error("Logout Error:", err); // 🔥 Real error dekho

    return res.status(500).json({
      success: false,
      message: err.message || "Server error.",
    });
  }
};
