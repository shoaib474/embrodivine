// routes/order.routes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  captureOrder,
  downloadInvoice,
} from "../controllers/order.Controller.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ ObjectId validation middleware — invalid ID pe seedha 400 return karo
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }
  next();
};

// ─────────────────────────────────────────
// 👤 User Routes
// ─────────────────────────────────────────

// POST   /api/orders          → Create new order (after PayPal payment)
router.post("/create-order", authVerification, createOrder);
router.post("/capture-order", authVerification, captureOrder);

// GET    /api/orders/my-orders → Get logged-in user's orders
router.get("/my-orders", authVerification, getMyOrders);

// GET    /api/orders/:orderId  → Get single order (user = own order, admin = any)
router.get("/:orderId", authVerification, validateObjectId, getOrderById);

router.get("/invoice/:orderId", authVerification, admin, downloadInvoice);

// ─────────────────────────────────────────
// 🔐 Admin Routes
// ─────────────────────────────────────────

// GET    /api/orders           → Get all orders with pagination + filters
router.get("/", authVerification, admin, getAllOrders);

// PUT    /api/orders/:orderId/status → Update order status
router.put(
  "/:orderId/status",
  authVerification,
  admin,
  validateObjectId,
  updateOrderStatus,
);

// DELETE /api/orders/:orderId  → Delete order
router.delete(
  "/:orderId",
  authVerification,
  admin,
  validateObjectId,
  deleteOrder,
);

export default router;
