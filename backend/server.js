const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express(); // ✅ app should be defined first

// ✅ Correct CORS setup
const allowedOrigin = "https://leaderboardapp-frontend.onrender.com";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
