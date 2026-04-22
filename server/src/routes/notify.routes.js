// routes/notifyRoutes.js
import express from "express";
import {
  notifyMe,
  getAllEmails,
  deleteEmail,
  deleteSelectedEmails,
} from "../controllers/notify.controller.js";

const router = express.Router();

router.post("/notify", notifyMe); // add
router.get("/notify", getAllEmails); // get all
router.delete("/notify/:id", deleteEmail); // delete single
router.post("/notify/delete-selected", deleteSelectedEmails); // delete multiple

export default router;
