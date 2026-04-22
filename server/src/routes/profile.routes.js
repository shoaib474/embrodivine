import express from "express";
import {
  deleteAccount,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;
