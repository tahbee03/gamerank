const express = require("express");
const {getUsers, getUserByID, userLogin, userRegister, updateUser, deleteUser} = require("../controllers/user_controller");
const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get specific user via ID
router.get("/:id", getUserByID);

// Login functionality
router.post("/login", userLogin);

// Sign up functionality
router.post("/register", userRegister);

// Update specific user
router.patch("/:id", updateUser);

// Delete specific user
router.delete("/:id", deleteUser);

module.exports = router; // Export the router so that it can be used in index.js