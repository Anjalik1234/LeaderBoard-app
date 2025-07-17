const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  claimPoints,
  getRankings
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", addUser);
router.post("/claim/:id", claimPoints);
router.get("/rankings", getRankings);

module.exports = router;