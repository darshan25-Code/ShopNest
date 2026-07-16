const express = require("express");

const router = express.Router();

const { protect ,adminOnly} = require("../middleware/authMiddleware");

const { placeOrder,getMyOrders,getAllOrders,updateOrderStatus,getSingleOrder } = require("../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getSingleOrder);

router.get("/", protect, adminOnly, getAllOrders);

router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;