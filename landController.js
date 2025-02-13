const express = require("express");
const landModel = require("../model/LandModel");

const landRoute = express.Router();

// POST route to submit land details
landRoute.post("/submit-land", async (req, res) => {
  try {
    const { name, phoneNumber, location, price, surveyNumber, area } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !location || !price || !surveyNumber || !area) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new land entry
    const newLand = new landModel({
      name,
      phoneNumber,
      location,
      price,
      surveyNumber,
      area,
    });

    // Save the land details to the database
    const savedLand = await newLand.save();
    res.status(201).json({ message: "Land details submitted successfully", land: savedLand });
  } catch (error) {
    console.error("Error submitting land details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET route to fetch all land details
landRoute.get("/get-lands", async (req, res) => {
  try {
    const lands = await landModel.find();
    res.status(200).json({ lands });
  } catch (error) {
    console.error("Error fetching land details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = landRoute;
