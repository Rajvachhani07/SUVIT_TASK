const express = require("express");
const router = express.Router();
const { placeOrder, cancelOrder, getUserOrders } = require("../controllers/orderController");

router.post("/", placeOrder);
router.post("/:id/cancel", cancelOrder);
router.get("/user/:userId", getUserOrders);

module.exports = router;
