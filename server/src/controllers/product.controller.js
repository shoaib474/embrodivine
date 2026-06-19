import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { redisClient } from "../config/redis.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import Category from "../models/Category.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

/* =========================
   CREATE PRODUCT
========================= */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      rating,
      productStatus,
      badge,
      dimensions,
      colors,
      zipUrl,
    } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    let image = {};
    if (req.files?.image?.[0]) {
      const result = await uploadToCloudinary(req.files.image[0].path, "image");
      image = { url: result.secure_url, public_id: result.public_id };
    }

    let pdf = {};
    if (req.files?.pdf?.[0]) {
      const result = await uploadToCloudinary(req.files.pdf[0].path, "raw");
      pdf = { url: result.secure_url, public_id: result.public_id };
    }

    let zip = [];
    if (req.files?.embroidery?.length) {
      for (const file of req.files.embroidery) {
        const result = await uploadToCloudinary(file.path, "raw");
        zip.push({
          url: result.secure_url,
          public_id: result.public_id,
          fileType: file.originalname?.split(".").pop() || "unknown",
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      category,
      price: Number(price) || 0,
      rating: Number(rating) || 0,
      productStatus,
      badge,
      dimensions,
      colors: colors || [],
      image,
      pdf,
      zip,
      zipUrl,
    });

    await Category.findByIdAndUpdate(category, {
      $inc: { productCount: 1 },
    });

    await redisClient.del("all_products");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProduct = async (req, res) => {
  try {
    const cacheKey = "all_products";

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        source: "redis",
        products: JSON.parse(cached),
      });
    }

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    const safeProducts = await Promise.all(
      products.map(async (p) => {
        try {
          if (p.category && mongoose.Types.ObjectId.isValid(p.category)) {
            await Product.populate(p, {
              path: "category",
              select: "name",
            });
          } else {
            p.category = null;
          }
        } catch (e) {
          p.category = null;
        }

        return p;
      }),
    );

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(products));

    return res.json({
      success: true,
      source: "mongodb",
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
export const getProductById = async (req, res) => {
  try {
    const cacheKey = `product_${req.params.id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        source: "redis",
        product: JSON.parse(cached),
      });
    }

    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));

    return res.json({
      success: true,
      source: "mongodb",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let {
      name,
      category,
      description,
      price,
      rating,
      productStatus,
      badge,
      dimensions,
      colors,
      zipUrl,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price required",
      });
    }

    const oldCategory = product.category;

    // ✅ FIX: category parsing (form-data safe)
    let newCategory = category;

    if (typeof category === "string") {
      try {
        const parsed = JSON.parse(category);
        newCategory = parsed._id || parsed;
      } catch {
        newCategory = category;
      }
    } else if (typeof category === "object") {
      newCategory = category?._id;
    }

    // IMAGE UPDATE
    if (req.files?.image?.[0]) {
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      const result = await uploadToCloudinary(req.files.image[0].path, "image");

      product.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // PDF UPDATE
    if (req.files?.pdf?.[0]) {
      if (product.pdf?.public_id) {
        await cloudinary.uploader.destroy(product.pdf.public_id, {
          resource_type: "raw",
        });
      }

      const result = await uploadToCloudinary(req.files.pdf[0].path, "raw");

      product.pdf = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // UPDATE FIELDS
    product.name = name;
    product.category = newCategory;
    product.description = description;
    product.price = Number(price) || product.price;
    product.rating = rating ? Number(rating) : product.rating;
    product.productStatus = productStatus || product.productStatus;
    product.badge = badge || product.badge;
    product.dimensions = dimensions;
    product.colors = colors || product.colors;
    product.zipUrl = zipUrl || product.zipUrl;

    await product.save();

    // ✅ CATEGORY COUNT FIX (always accurate)
    const oldCatId = oldCategory?.toString();
    const newCatId = newCategory?.toString();

    if (oldCatId) {
      const oldCount = await Product.countDocuments({
        category: new mongoose.Types.ObjectId(oldCatId),
      });

      await Category.findByIdAndUpdate(oldCatId, {
        productCount: oldCount,
      });
    }

    if (newCatId && newCatId !== oldCatId) {
      const newCount = await Product.countDocuments({
        category: new mongoose.Types.ObjectId(newCatId),
      });

      await Category.findByIdAndUpdate(newCatId, {
        productCount: newCount,
      });
    }

    // CACHE CLEAR
    await redisClient.del("all_products");
    await redisClient.del(`product_${id}`);

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.category) {
      await Category.findByIdAndUpdate(product.category, {
        $inc: { productCount: -1 },
      });
    }

    await Product.findByIdAndDelete(id);

    await User.updateMany(
      {},
      {
        $pull: {
          cart: { product: id },
          favorites: id,
        },
      },
    );

    await redisClient.del("all_products");
    await redisClient.del(`product_${id}`);

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   SEARCH PRODUCTS
========================= */
export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const cacheKey = `search_${query}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        source: "redis",
        products: JSON.parse(cached),
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    await redisClient.setEx(cacheKey, 300, JSON.stringify(products));

    return res.json({
      success: true,
      source: "mongodb",
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
