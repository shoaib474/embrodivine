import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/User.controller.js";

import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", authVerification, admin, getAllUsers);
router.put("/:id/role", authVerification, admin, updateUserRole);
router.delete("/:id", authVerification, admin, deleteUser);

export default router;