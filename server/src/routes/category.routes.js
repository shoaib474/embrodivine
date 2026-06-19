import express from "express";

import {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "../controllers/category.controller.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// GET ALL CATEGORIES
router.get("/", getCategories);

// GET single category
router.get("/:slug", getCategoryBySlug);

// GET category + products (BEST OPTION)
router.get("/:slug/products", getProductsByCategorySlug);


// CREATE CATEGORY
router.post(
  "/",
  authVerification,
  admin,
  upload.single("thumbnail"),
  createCategory,
);

// GET SINGLE CATEGORY
router.get("/:id", authVerification, getSingleCategory);

// UPDATE CATEGORY
router.put(
  "/:id",
  authVerification,
  admin,
  upload.single("thumbnail"),
  updateCategory,
);

// DELETE CATEGORY
router.delete("/:id", authVerification, admin, deleteCategory);

export default router;
