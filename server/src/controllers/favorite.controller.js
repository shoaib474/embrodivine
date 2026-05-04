import Favorite from "../models/Favorite.model.js";
import Product from "../models/Product.model.js";
import { redisClient } from "../config/redis.js";

// Get all favorites of logged-in user
export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const cacheKey = `favorites_${userId}`;

    // 🔥 CHECK REDIS FIRST
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        source: "redis",
        favorites: JSON.parse(cached),
      });
    }

    const favorites = await Favorite.find({ user: userId }).populate("product");

    // 🔥 STORE IN REDIS
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(favorites));

    res.status(200).json({
      success: true,
      source: "db",
      favorites,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Toggle favorite (add/remove)
export const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const cacheKey = `favorites_${userId}`;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existing = await Favorite.findOne({
      user: userId,
      product: productId,
    });

    let message = "";

    if (existing) {
      // ❌ REMOVE
      await existing.deleteOne();
      message = "Removed from favorites";
    } else {
      // ✅ ADD
      await Favorite.create({
        user: userId,
        product: productId,
      });
      message = "Added to favorites";
    }

    // 🔥 UPDATE CACHE (REFRESH FULL LIST)
    const updatedFavorites = await Favorite.find({ user: userId }).populate(
      "product",
    );

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(updatedFavorites));

    return res.status(200).json({
      success: true,
      message,
      favorites: updatedFavorites,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
