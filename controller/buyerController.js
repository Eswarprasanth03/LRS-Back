const express = require("express");
const multer = require("multer");
const buyerModel = require("../model/buyerModel");
const buyerRoute = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new buyer
buyerRoute.post("/create-user", upload.single("governmentIdImage"), async (req, res) => {
  try {
    const { name, email, password, phoneNumber, location, governmentId, BuyerIdImage } = req.body;

    if (!name || !email || !password || !phoneNumber || !location || !governmentId ||BuyerIdImage|| !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBuyer = new buyerModel({
      name,
      email,
      password,
      phoneNumber,
      location,
      governmentId,
      governmentIdImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      BuyerIdImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    });

    const savedBuyer = await newBuyer.save();
    res.status(201).json(savedBuyer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

buyerRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await buyerModel.findOne({ email, password }).select('+isVerified +lastLogin');
    if (user) {
      res.status(200).json({
        message: "Login successful",
        userId: user._id,
        isVerified: user.isVerified || false,
        lastLogin: user.lastLogin
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

buyerRoute.get("/get-user/:id", async (req, res) => {
  try {
    const buyer = await buyerModel.findById(req.params.id).select('+isVerified +lastLogin');
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    const buyerObj = buyer.toObject();
    if (buyerObj.governmentIdImage && buyerObj.governmentIdImage.data) {
      buyerObj.governmentIdImage = {
        data: buyerObj.governmentIdImage.data.toString("base64"),
        contentType: buyerObj.governmentIdImage.contentType,
      };
    }
    if (buyerObj.BuyerIdImage && buyerObj.BuyerIdImage.data) {
      buyerObj.BuyerIdImage = {
        data: buyerObj.BuyerIdImage.data.toString("base64"),
        contentType: buyerObj.BuyerIdImage.contentType,
      };
    }
    res.status(200).json(buyerObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

buyerRoute.get("/verification-status/:id", async (req, res) => {
  try {
    const buyer = await buyerModel.findById(req.params.id).select('+isVerified');
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.status(200).json({
      isVerified: buyer.isVerified || false,
      message: buyer.isVerified
        ? "Your account is verified"
        : "Your account is pending verification"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

buyerRoute.get("/get-photo/:id", async (req, res) => {
  try {
    const buyer = await buyerModel.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    const photos = {
      BuyerIdImage: buyer.BuyerIdImage ? {
        data: buyer.BuyerIdImage.data.toString('base64'),
        contentType: buyer.BuyerIdImage.contentType
      } : null
    };
    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching buyer photos:", error);
    res.status(500).json({ message: "Error fetching photos" });
  }
});

buyerRoute.put("/update-last-login/:id", async (req, res) => {
  try {
    const buyer = await buyerModel.findByIdAndUpdate(
      req.params.id,
      { lastLogin: new Date() },
      { new: true }
    );
    
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    
    res.status(200).json({ 
      message: "Last login updated successfully",
      lastLogin: buyer.lastLogin 
    });
  } catch (error) {
    console.error("Error updating last login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = buyerRoute;
