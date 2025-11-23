const Product = require("../models/Product");
const Vendor = require("../models/vendor");

exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.vendorId) {
      filter.vendorId = req.query.vendorId;
    }

    const products = await Product.find(filter).populate("vendorId", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendorId", "name email");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { vendorId, name, price, stockQty, description } = req.body;

    if (!vendorId || !name || !price || !stockQty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await Product.create({
      vendorId,
      name,
      price,
      stockQty,
      description,
    });
 res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};