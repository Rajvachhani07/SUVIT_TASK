const Product = require("../models/Product");
const Vendor = require("../models/vendor");

// GET all products with vendor info
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendorId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId", "name email");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
