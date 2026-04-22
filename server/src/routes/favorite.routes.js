import express from "express";
import { getUserFavorites, toggleFavorite } from "../controllers/favorite.controller.js";
import authVerification from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authVerification, getUserFavorites);
router.post("/toggle", authVerification, toggleFavorite);

export default router; 
 
  