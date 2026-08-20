import express from "express";

import {
  deleteArtwork,
  getAllArtworks,
  getArtworkById,
  getArtworkStats,
  getRecentArtworks,
  updateAdminNote,
  updateArtwork,
  updateArtworkStatus,
  uploadArtwork,
} from "../controllers/artwork.controller.js";
import upload from "../middleware/upload.middleware.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", upload.array("files", 10), uploadArtwork);
router.get("/", authVerification, admin, getAllArtworks);
router.get("/stats", authVerification, admin, getArtworkStats);
router.get("/recent", authVerification, admin, getRecentArtworks);
router.get("/:id", authVerification, admin, getArtworkById);
router.put("/:id", authVerification, admin, updateArtwork);
router.patch("/:id/status", authVerification, admin, updateArtworkStatus);
router.patch("/:id/admin-note", authVerification, admin, updateAdminNote);
router.delete("/:id", authVerification, admin, deleteArtwork);

export default router;
