import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.model.js";
import Profile from "../models/Profile.model.js";
import { redisClient } from "../config/redis.js";
import sendResetToken from "../utils/sendEmail.js";

/* =========================
   REGISTER USER (RATE LIMIT)
========================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const ip = req.ip;
    const key = `register_attempt_${ip}`;

    const attempts = await redisClient.get(key);

    if (attempts && Number(attempts) >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again later.",
      });
    }

    const newAttempts = await redisClient.incr(key);

    if (newAttempts === 1) {
      await redisClient.expire(key, 60 * 10);
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,

      isVerified: false,
      verificationToken,
      verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000,
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

    const verifyUrl = `${process.env.CLIENT_URL ?? process.env.CLIENT_URL_2}/verify-email/${verificationToken}`;

    await sendResetToken({
      to: newUser.email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome to EmbroDivine</h2>
        <p>Please verify your email.</p>

        <a href="${verifyUrl}">
          Verify Email
        </a>

        <p>This link expires in 24 hours.</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist! Please register.",
      });
    }

    // ✅ EMAIL VERIFICATION CHECK
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
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

    // Clear failed attempts after successful login
    await redisClient.del(failKey);
    await redisClient.del(blockKey);

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      },
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

    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
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

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    // Security
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists, a password reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL ?? process.env.CLIENT_URL_2}/reset-password/${resetToken}`;

    await sendResetToken({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below link to reset password:</p>
        <a href="${resetUrl}">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Logout from all sessions
    if (redisClient?.isOpen) {
      await redisClient.del(`session_${user._id}`);
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Password Validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain uppercase, lowercase and a number.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    // Don't allow same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as current password.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // Remove Redis Session
    if (redisClient?.isOpen) {
      await redisClient.del(`session_${user._id}`);
    }

    // Clear Login Cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. Please login again.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
