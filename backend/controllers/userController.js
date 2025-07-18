const User = require("../models/User");
const ClaimHistory = require("../models/claimHistory");

// ✅ Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ Add a new user
const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

// ✅ Claim points (random 1–10) for a specific user
const claimPoints = async (req, res) => {
  try {
    const userId = req.params.id;

    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += points;
    await user.save();

    // Log in ClaimHistory
    const log = new ClaimHistory({
      userId: user._id,
      pointsAwarded: points
    });
    await log.save();

    res.json({
      message: `${user.name} received ${points} points!`,
      user,
      awardedPoints: points
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to claim points" });
  }
};

// ✅ Get rankings sorted by totalPoints
const getRankings = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    // Assign rank manually
    const rankedUsers = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints
    }));

    res.json(rankedUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rankings" });
  }
};

module.exports = {
  getUsers,
  addUser,
  claimPoints,
  getRankings
};
