import express from 'express';
import cartController from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/add", authMiddleware, cartController.addToCart);
router.post("/remove", authMiddleware, cartController.removeFromCart);
router.post("/get", authMiddleware, cartController.getCart);

export default router;