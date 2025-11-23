const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");


exports.placeOrder = async (req, res) => {
  const { productId, userId, qty } = req.body;

  if (!productId || !userId || !qty) return res.status(400).json({ error: "Missing fields" });

  try {
    
    const product = await Product.findOneAndUpdate(
      { _id: productId, stockQty: { $gte: qty } },
      { $inc: { stockQty: -qty } },
      { new: true }
    );

    if (!product) return res.status(400).json({ error: "Not enough stock" });

    const order = await Order.create({ productId, userId, qty });
    res.status(201).json(order);
  } catch (err) {
    
    await Product.findByIdAndUpdate(productId, { $inc: { stockQty: qty } });
    res.status(500).json({ error: err.message });
  }
};


exports.cancelOrder = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await Order.findById(id).session(session);
    if (!order) throw new Error("Order not found");
    if (order.status === "CANCELLED") throw new Error("Already cancelled");

    order.status = "CANCELLED";
    await order.save({ session });

    await Product.findByIdAndUpdate(order.productId, { $inc: { stockQty: order.qty } }, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("productId", "name price stockQty vendorId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
