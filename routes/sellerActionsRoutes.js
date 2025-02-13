const express = require("express");
const router = express.Router();
const SellerAction = require("../model/SellerAction");

router.get("/", async (req, res) => {
  try {
    const actions = await SellerAction.find().sort({ timestamp: -1 });
    res.status(200).json(actions);
  } catch (error) {
    console.error("Error fetching seller actions:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/", async (req, res) => {
    try {
      const { sellerId, actionType, details } = req.body;
      if (!sellerId || !actionType || !details) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newAction = new SellerAction({ sellerId, actionType, details });
      await newAction.save();
      res.status(201).json(newAction);
    } catch (error) {
      console.error("Error saving seller action:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
