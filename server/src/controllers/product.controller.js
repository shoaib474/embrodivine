import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { redisClient } from "../config/redis.js";
import Product from "../models/Product.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// CREATE PRODUCT
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

    if (
      !name ||
      !description ||
      !price ||
      !rating ||
      !productStatus ||
      !badge ||
      !dimensions ||
      !colors
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ===== IMAGE UPLOAD (Cloudinary image) =====
    let image = {};
    if (req.files?.image?.[0]) {
      const result = await uploadToCloudinary(req.files.image[0].path, "image");
      image = { url: result.secure_url, public_id: result.public_id };
    }

    // ===== PDF UPLOAD (Cloudinary raw) =====
    let pdf = {};
    if (req.files?.pdf?.[0]) {
      const result = await uploadToCloudinary(req.files.pdf[0].path, "raw");
      pdf = { url: result.secure_url, public_id: result.public_id };
    }

    // ===== EMBROIDERY FILES UPLOAD (Cloudinary raw, multiple files) =====
    let zip = [];
    if (req.files?.embroidery && req.files.embroidery.length > 0) {
      for (const file of req.files.embroidery) {
        const result = await uploadToCloudinary(file.path, "raw");
        zip.push({
          url: result.secure_url,
          public_id: result.public_id,
          fileType: file.originalname.split(".").pop(), // e.g., dst / pes
        });
      }
    }

    // ===== CREATE PRODUCT =====
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      rating: Number(rating),
      productStatus,
      badge,
      dimensions,
      colors: Number(colors),
      image,
      pdf,
      zip,
      zipUrl,
    });

    await redisClient.del("all_products");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// GET ALL PRODUCTS
export const getProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const cursor = req.query.cursor;

    const cacheKey = `products_cursor_${cursor || "start"}_${limit}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        source: "redis",
        ...JSON.parse(cached),
      });
    }

    let query = {};

    // Cursor pagination
    if (cursor) {
      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor),
      };
    }

    // Extra 1 product fetch for hasMore check
    const products = await Product.find(query)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = products.length > limit;

    // Extra item remove
    if (hasMore) {
      products.pop();
    }

    const nextCursor =
      products.length > 0 ? products[products.length - 1]._id : null;

    const response = {
      products,
      nextCursor,
      hasMore,
    };

    // Redis cache
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

    return res.json({
      success: true,
      source: "mongodb",
      ...response,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const cacheKey = `product_${req.params.id}`;

    const cachedProduct = await redisClient.get(cacheKey);

    if (cachedProduct) {
      return res.status(200).json({
        success: true,
        source: "redis",
        product: JSON.parse(cachedProduct),
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));

    res.status(200).json({
      success: true,
      source: "mongodb",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ===== IMAGE UPDATE =====
    if (req.files?.image?.[0]) {
      // optional: delete old image from Cloudinary
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }
      const result = await uploadToCloudinary(req.files.image[0].path, "image");
      product.image = { url: result.secure_url, public_id: result.public_id };
    }

    // ===== PDF UPDATE =====
    if (req.files?.pdf?.[0]) {
      // optional: delete old PDF from Cloudinary
      if (product.pdf?.public_id) {
        await cloudinary.uploader.destroy(product.pdf.public_id, {
          resource_type: "raw",
        });
      }
      const result = await uploadToCloudinary(req.files.pdf[0].path, "raw");
      product.pdf = { url: result.secure_url, public_id: result.public_id };
    }

    // ===== EMBROIDERY FILES UPDATE =====
    // if (req.files?.embroidery && req.files.embroidery.length > 0) {
    //   // optional: delete old embroidery files
    //   for (const file of product.embroideryFiles || []) {
    //     if (file.public_id) {
    //       await cloudinary.uploader.destroy(file.public_id, { resource_type: "raw" });
    //     }
    //   }

    //   // upload new embroidery files
    //   const newEmbroideryFiles = [];
    //   for (const file of req.files.embroidery) {
    //     const result = await uploadToCloudinary(file.path, "raw");
    //     newEmbroideryFiles.push({
    //       url: result.secure_url,
    //       public_id: result.public_id,
    //       fileType: file.originalname.split(".").pop(),
    //     });
    //   }
    //   product.embroideryFiles = newEmbroideryFiles;
    // }

    // ===== UPDATE OTHER FIELDS =====
    product.name = name;
    product.category = category;
    product.description = description;
    product.price = Number(price);
    product.rating = Number(rating);
    product.productStatus = productStatus || product.productStatus;
    product.badge = badge || product.badge;
    product.dimensions = dimensions;
    product.colors = Number(colors);
    product.zipUrl = zipUrl || product.zipUrl;

    await product.save();

    await redisClient.del("all_products");
    await redisClient.del(`product_${id}`);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// DELETE SINGLE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 1️⃣ Delete image from Cloudinary first
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    if (product.pdf?.public_id) {
      await cloudinary.uploader.destroy(product.pdf.public_id);
    }

    // 2️⃣ Delete product from DB
    await product.deleteOne();

    await redisClient.del("all_products");
    await redisClient.del(`product_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
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

    res.status(200).json({
      success: true,
      source: "mongodb",
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
