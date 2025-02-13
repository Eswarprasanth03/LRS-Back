const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import controllers
const userDetails = require("./controller/userController");
const adminDetails = require("./controller/adminController");
const sellerDetails = require("./controller/sellerController");
const buyerDetails = require("./controller/buyerController");
const sellerActionsRoutes = require("./routes/sellerActionsRoutes");
const landDetails = require("./controller/landController"); // Import addLand function

const app = express();

// Database connection
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/SDP", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/userRoute", userDetails);
app.use("/adminRoute", adminDetails);
app.use("/sellerRouter", sellerDetails);
app.use("/buyerRouter", buyerDetails);
app.use("/SellerActions", sellerActionsRoutes);

// Directly define the land submission endpoint
app.use("/land",landDetails );

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});



// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const userDetails = require("./controller/userController");
// const adminDetails = require("./controller/adminController");
// const sellerDetails = require("./controller/sellerController");
// const buyerDetails = require("./controller/buyerController");
// const sellerActionsRoutes = require("./routes/sellerActionsRoutes");



// const app = express();
// mongoose.set("strictQuery", true);
// // mongoose.connect("mongodb+srv://user:123@cluster0.ddtv2.mongodb.net/SDP");
// mongoose.connect("mongodb://localhost:27017/SDP");

// var db = mongoose.connection;
// db.on("open", () => console.log("connected to db"));
// db.on("error", () => console.log("Error occured"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use("/userRoute", userDetails);
// app.use("/adminRoute", adminDetails);
// app.use("/sellerRouter", sellerDetails);
// app.use("/buyerRouter", buyerDetails);
// app.use("/SellerActions",sellerActionsRoutes)




// app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });
