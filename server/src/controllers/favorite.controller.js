import Favorite from "../models/Favorite.model.js";
import Product from "../models/Product.model.js";

// Get all favorites of logged-in user
export const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate(
      "product"
    );
    res.status(200).json({ success: true, favorites });
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

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const existing = await Favorite.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existing) {
      // Remove from favorites
      await existing.deleteOne();
      return res
        .status(200)
        .json({ success: true, message: "Removed from favorites" });
    } else {
      // Add to favorites
      const favorite = await Favorite.create({
        user: req.user.id,
        product: productId,
      });
      return res
        .status(201)
        .json({ success: true, message: "Added to favorites", favorite });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
