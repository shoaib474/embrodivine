import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import slugify from "slugify";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   CREATE CATEGORY
========================= */
export const createCategory = async (req, res) => {
  try {
    const { name, description, status, featured, seoTitle, seoDescription } =
      req.body;

    const cleanName = name?.trim();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // case-insensitive duplicate check
    const existingCategory = await Category.findOne({
      name: { $regex: `^${cleanName}$`, $options: "i" },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let thumbnail = {};

    if (req.file?.path) {
      const result = await uploadToCloudinary(req.file.path, "image");

      thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const category = await Category.create({
      name: cleanName,
      slug: slugify(cleanName, { lower: true, strict: true }),
      description,
      thumbnail,
      status: status ?? true,
      featured: featured ?? false,
      seoTitle,
      seoDescription,
      productCount: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL CATEGORIES
========================= */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET SINGLE CATEGORY
========================= */
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE CATEGORY
========================= */
export const updateCategory = async (req, res) => {
  try {
    const { name, description, status, featured, seoTitle, seoDescription } =
      req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const cleanName = name?.trim();

    if (cleanName) {
      const duplicate = await Category.findOne({
        name: { $regex: `^${cleanName}$`, $options: "i" },
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "Another category already exists with this name",
        });
      }

      category.name = cleanName;
      category.slug = slugify(cleanName, { lower: true, strict: true });
    }

    // IMAGE UPDATE
    if (req.file?.path) {
      if (category.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(category.thumbnail.public_id);
      }

      const result = await uploadToCloudinary(req.file.path, "image");

      category.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    category.description = description ?? category.description;
    category.status = status ?? category.status;
    category.featured = featured ?? category.featured;
    category.seoTitle = seoTitle ?? category.seoTitle;
    category.seoDescription = seoDescription ?? category.seoDescription;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE CATEGORY
========================= */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // safer + faster check
    const hasProducts = await Product.exists({ category: category._id });

    if (hasProducts) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category because products are using it",
      });
    }

    // delete image safely
    if (category.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(category.thumbnail.public_id);
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET CATEGORY BY SLUG
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("getCategoryBySlug error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET PRODUCTS BY CATEGORY SLUG
export const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // find category first
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // get products using category _id (recommended)
    const products = await Product.find({ category: category._id })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.error("getProductsByCategorySlug error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};