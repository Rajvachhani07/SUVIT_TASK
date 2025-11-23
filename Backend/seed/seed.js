require("dotenv").config();
const mongoose = require("mongoose");

const Vendor = require("../models/vendor");
const Product = require("../models/Product");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB for Seeding");

    // CLEAR OLD DATA
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    console.log("🧹 Cleared old Vendor & Product data");

    // CREATE VENDORS
    const vendors = await Vendor.insertMany([
      { name: "Sports World", email: "sports@vendors.com" },
      { name: "Daily Essentials", email: "essentials@vendors.com" },
      { name: "Tech Hub", email: "tech@vendors.com" },
    ]);

    console.log("🏪 Vendors inserted:", vendors.length);

    // CREATE PRODUCTS (sample 10 products)
    const products = [
      {
        vendorId: vendors[0]._id,
        name: "Cricket Bat",
        price: 1500,
        stockQty: 25,
        description: "High quality wooden cricket bat",
      },
      {
        vendorId: vendors[0]._id,
        name: "Football",
        price: 800,
        stockQty: 40,
        description: "Durable football, match grade",
      },
      {
        vendorId: vendors[0]._id,
        name: "Tennis Racket",
        price: 2000,
        stockQty: 15,
        description: "Lightweight pro tennis racket",
      },

      {
        vendorId: vendors[1]._id,
        name: "Milk Pack",
        price: 60,
        stockQty: 100,
        description: "Fresh full cream milk",
      },
      {
        vendorId: vendors[1]._id,
        name: "Eggs (12 Pack)",
        price: 90,
        stockQty: 50,
        description: "Farm fresh eggs",
      },
      {
        vendorId: vendors[1]._id,
        name: "Bread Loaf",
        price: 40,
        stockQty: 80,
        description: "Whole wheat bread",
      },

      {
        vendorId: vendors[2]._id,
        name: "Wireless Mouse",
        price: 500,
        stockQty: 30,
        description: "2.4 GHz high precision mouse",
      },
      {
        vendorId: vendors[2]._id,
        name: "Keyboard",
        price: 700,
        stockQty: 25,
        description: "Mechanical keyboard",
      },
      {
        vendorId: vendors[2]._id,
        name: "USB Type-C Cable",
        price: 150,
        stockQty: 60,
        description: "Fast charging cable",
      },

      {
        vendorId: vendors[2]._id,
        name: "Bluetooth Speaker",
        price: 1200,
        stockQty: 18,
        description: "Portable speaker with deep bass",
      },
    ];

    await Product.insertMany(products);
    console.log("📦 Products inserted:", products.length);

    console.log("🎉 Seeding Completed Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedData();
