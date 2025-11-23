const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Vendor = require("../models/vendor"); 


exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().select("name _id");
    res.json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};
exports.getVendorDashboard = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const stats = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      { $match: { "product.vendorId": new mongoose.Types.ObjectId(vendorId) } },
      {
        $group: {
          _id: "$productId",
          productName: { $first: "$product.name" },
          totalQty: { $sum: "$qty" },
          totalRevenue: { $sum: { $multiply: ["$qty", "$product.price"] } },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
