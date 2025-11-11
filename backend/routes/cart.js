import express from "express";
import {
  getCart,
  addItemToCart,
  removeOneInstance,
  clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:userId", getCart);          // Get cart
router.post("/add", addItemToCart);       // Add item
router.post("/remove", removeOneInstance); // ✅ match name here
router.post("/clear", clearCart);         // Clear cart

export default router;
