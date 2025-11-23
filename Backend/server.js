require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db.js");

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database connection
connectDB();

// Temporary test route
app.get("/", (req, res) => {
  res.send("Multi-Vendor Backend API is running...");
});

// (Routes will be added later)
// Example:
// app.use("/api/products", require("./src/routes/productRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
