const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQty: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
