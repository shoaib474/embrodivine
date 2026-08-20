import express from "express";

import {
  dashboardUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import authVerification from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authVerification, logoutUser);
router.get("/dashboard", authVerification, dashboardUser);
router.post("/update-password", authVerification, updatePassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
