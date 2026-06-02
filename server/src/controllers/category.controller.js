import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import slugify from "slugify";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
 
  try {
    const { name, description, status, featured, seoTitle, seoDescription } =
      req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let thumbnail = {};

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, "image");
      console.log("result ayaa ha",result);

      thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slugify(name, {
        lower: true,
        strict: true,
      }),
      description,
      thumbnail,
      status,
      featured,
      seoTitle,
      seoDescription,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// GET SINGLE CATEGORY
export const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("GET SINGLE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: error.message,
    });
  }
};

// UPDATE CATEGORY
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

    if (name && name.trim()) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Another category already exists with this name",
        });
      }
    }

    if (req.file) {
      if (category.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(category.thumbnail.public_id);
      }

      const result = await uploadToCloudinary(req.file.path, "image");

      category.thumbnail = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    category.name = name?.trim() || category.name;

    category.slug = slugify(category.name, {
      lower: true,
      strict: true,
    });

    category.description = description ?? category.description;
    category.status = status ?? category.status;
    category.featured = featured ?? category.featured;
    category.seoTitle = seoTitle ?? category.seoTitle;
    category.seoDescription = seoDescription ?? category.seoDescription;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const productsUsingCategory = await Product.countDocuments({
      category: category._id,
    });

    if (productsUsingCategory > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category because products are using it",
      });
    }

    if (category.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(category.thumbnail.public_id);
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};