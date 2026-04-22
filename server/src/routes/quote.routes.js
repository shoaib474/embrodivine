import express from "express";
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
  deleteSelectedQuotes,
  updateQuoteStatus,
} from "../controllers/quote.controller.js";

import upload from "../middleware/upload.middleware.js";
import authVerification from "../middleware/auth.middleware.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

// Public – submit quote with files
router.post("/", upload.array("attachments", 5), createQuote);

// Admin
router.get("/", authVerification, admin, getAllQuotes);
router.get("/:id", authVerification, admin, getQuoteById);
router.put("/:id", authVerification, admin, updateQuote);
router.patch("/:id/status",authVerification,admin, updateQuoteStatus);
router.delete("/:id", authVerification, admin, deleteQuote);
router.post("/delete-selected", authVerification, admin, deleteSelectedQuotes);

export default router;
