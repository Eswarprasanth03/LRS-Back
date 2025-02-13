const express = require("express");
const router = express.Router();
const { addLand } = require("../controller/landController"); // Import Controller

// Route to submit land details
router.post("/submit-land", addLand);

module.exports = router;
