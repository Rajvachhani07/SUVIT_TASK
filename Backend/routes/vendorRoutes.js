const express = require("express");
const router = express.Router();
const { getAllVendors, getVendorDashboard } = require("../controllers/vendorController");

router.get("/", getAllVendors);
router.get("/:vendorId/dashboard", getVendorDashboard);

module.exports = router;
