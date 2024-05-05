const express = require("express");
const {getUsers, getTopReviewers, getUserByID, getUserFollowers, getUserFollowing, userLogin, userRegister, updateUser, deleteUser, followUser, unfollowUser} = require("../controllers/user_controller");
const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get top reviewers by reviews
router.get("/topreviewers", getTopReviewers);

// Get specific user via ID
router.get("/:id", getUserByID);

// Get a user's followers
router.get("/:id/followers", getUserFollowers);

// Get a user's following
router.get("/:id/following", getUserFollowing);

// Login functionality
router.post("/login", userLogin);

// Sign up functionality
router.post("/register", userRegister);

// Update specific user
router.patch("/:id", updateUser);

// Delete specific user
router.delete("/:id", deleteUser);

// Follow a user
router.post("/follow/:id", followUser);

// Unfollow a user
router.post("/unfollow/:id", unfollowUser);
module.exports = router; // Export the router so that it can be used in index.js