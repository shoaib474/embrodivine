import User from "../models/User.model.js";
import { redisClient } from "../config/redis.js";

// @desc    Get all users
export const getAllUsers = async (req, res) => {
  try {
    const cacheKey = "users_all";

    // 🔥 CHECK REDIS FIRST
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        source: "redis",
        users: JSON.parse(cached),
      });
    }

    const users = await User.find().select("-password");

    // 🔥 STORE IN REDIS
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(users));

    res.status(200).json({
      success: true,
      source: "db",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role || user.role;
    await user.save();

    // 🔥 CACHE INVALIDATE
    await redisClient.del("users_all");

    // optional per-user cache
    await redisClient.del(`user_${userId}`);

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    // 🔥 CACHE CLEANUP
    await redisClient.del("users_all");
    await redisClient.del(`user_${userId}`);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
