import express from "express";
import authVerification from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  checkoutCart,
  removeFromCart,
  saveForLater,
  moveToCart,
  getSavedItems,
  removeSavedItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", authVerification, addToCart); // Add item to cart
router.get("/", authVerification, getCart); // Get cart items
router.delete("/remove/:productId", authVerification, removeFromCart); // Get cart items
router.delete("/clear", authVerification, clearCart);
router.use(authVerification);
router.post("/save-for-later", saveForLater); // Move item from cart to Save for Later
router.post("/move-to-cart", moveToCart);
router.get("/saved", getSavedItems); // Fetch Save for Later items
router.delete("/saved/remove/:productId", authVerification, removeSavedItem);
router.post("/checkout", authVerification, checkoutCart); // Checkout cart (create order)

export default router;
