const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect("mongodb+srv://anjali:anjali1194@leaderboard.fgqkb1c.mongodb.net/leaderboard")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
