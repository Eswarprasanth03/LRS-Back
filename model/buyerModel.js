const mongoose=require('mongoose');

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    governmentId: { type: String, required: true, unique: true, trim: true },
    governmentIdImage: {
      data: Buffer,
      contentType: String,
    },
    BuyerIdImage: {
      data: Buffer,
      contentType: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
  
    
  },
  {
    collection: "BuyerAccountRegistrations",
    timestamps: true,
  }
);
module.exports = mongoose.model("buyer", buyerSchema);