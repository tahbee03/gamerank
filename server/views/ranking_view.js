const express = require("express");
const {getRankings, getRankingByID, createRanking, deleteRanking} = require("../controllers/ranking_controller");
const router = express.Router();

// Get all rankings
router.get("/", getRankings);

// Get specific ranking via ID
router.get("/:id", getRankingByID);

// Create ranking
router.post("/", createRanking);

// Delete specific ranking
router.delete("/:id", deleteRanking);

module.exports = router; // Export the router so that it can be used in index.js