import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.post('/place', authMiddleware, orderController.placeOrder);
router.post('/verify', authMiddleware, orderController.verifyOrder);
router.post('/user-orders', authMiddleware, orderController.userOrder);

//for admin panel
router.get('/list', orderController.listOrders);
router.post('/status', orderController.updateStatus);

export default router;