import express from "express";
import {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/product.controller.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getProductById);

router.post(
  "/",
  authVerification,
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createProduct,
);

router.put(
  "/:id",
  authVerification,
  admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  updateProduct,
);

router.delete("/:id", authVerification, admin, deleteProduct);
router.get("/search", searchProducts);

export default router;
