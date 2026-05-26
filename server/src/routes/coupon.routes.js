import express from "express";

import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

// CRUD
router.post("/", authVerification, admin, createCoupon);
router.get("/", authVerification, admin, getAllCoupons);
router.get("/:id", authVerification, admin, getCouponById);
router.put("/:id", authVerification, admin, updateCoupon);
router.delete("/:id", authVerification, admin, deleteCoupon);

// Validate (checkout)
router.post("/validate", authVerification, validateCoupon);

export default router;
