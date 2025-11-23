const express = require("express");
const router = express.Router();
const { getVendorDashboard } = require("../controllers/vendorController");

router.get("/:vendorId/dashboard", getVendorDashboard);

module.exports = router;
