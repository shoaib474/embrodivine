import express from "express";

import { dashboardUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import authVerification from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authVerification, logoutUser);
router.get("/dashboard", authVerification, dashboardUser);

export default router;