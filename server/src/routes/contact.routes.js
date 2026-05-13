import express from "express";
import authVerification from "../middleware/auth.middleware.js";
import {
  submitContactForm,
  getAllContacts,
  getSingleContact,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";
import admin from "../middleware/admin.middleware.js";

const router = express.Router();

// Public
router.post("/submit", submitContactForm);

// Admin
router.get("/", authVerification, admin, getAllContacts);
router.get("/:id", authVerification, admin, getSingleContact);
router.put("/:id/status", authVerification, admin, updateContactStatus);
router.delete("/:id", authVerification, admin, deleteContact);

export default router;
