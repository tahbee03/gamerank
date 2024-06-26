const User = require("../models/user_model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    if (users.length == 0) res.status(404).json({ msg: "There are no users!" });
    else res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};

// Get specific user
const getUserByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "No such user!" });

  try {
    const user = await User.findById(id);

    if (!user) res.status(404).json({ error: "No such user!" });
    else res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};

const calculateTopReviewers = async () => {
  try {
    const topReviewers = await User.aggregate([
      {
        $match: {
          reviews: { $type: 'number', $gte: 0 }
        }
      },
      {
        $project: {
          username: 1,
          reviewCount: '$reviews'
        }
      },
      { $sort: { reviewCount: -1 } },
      // { $limit: 10 } 
    ]);

    return topReviewers;
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating top reviewers');
  }
};

// Get top reviewers by review count
const getTopReviewers = async (req, res) => {
  try {
    const topReviewers = await calculateTopReviewers();
    res.json(topReviewers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login functionality
const userLogin = async (req, res) => {
  const passwordCheck = async (plaintext, hash) => {
    const match = await bcrypt.compare(plaintext, hash); // Compare password hashes
    return match;
  };

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) res.status(404).json({ error: "No such user!" });
    else if (!(await passwordCheck(password, user.password))) res.status(400).json({ error: "Incorrect password!" });
    else res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      pfp: user.pfp,
      role: user.role,
      followers: user.followers,
      following: user.following,
      reviews: user.reviews
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Sign up functionality
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userDupe = await User.findOne({ username });
    const emailDupe = await User.findOne({ email });
    if (userDupe && emailDupe) {
      res.status(400).json({ error: "Username and email already in use!" });
    } else if (userDupe) {
      res.status(400).json({ error: "Username already in use!" });
    } else if (emailDupe) {
      res.status(400).json({ error: "Email already in use!" });
    }
    else {
      const salt = await bcrypt.genSalt(10); // Generate salt to be concatenated with password
      const hash = await bcrypt.hash(password, salt); // Hash password and salt

      const user = await User.create({
        username,
        email,
        password: hash,
        pfp: "",
        role: "gamer"
      });

      res.status(200).json({
        username: user.username,
        email: user.email,
        id: user._id,
        pfp: user.pfp,
        role: user.role,
        followers: user.followers,
        following: user.following,
        reviews: user.reviews
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update specific user
const updateUser = async (req, res) => {
  // res.send("update user");

  // TODO: Implement
};

// Delete specific user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "No such user!" });

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) res.status(404).json({ error: "No such user!" });
    else res.status(200).json({ msg: "User successfully deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};

// Follow user
const followUser = async (req, res) => {
  const { id } = req.params;
  const { userIdToFollow } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user2 = await User.findById(userIdToFollow);
    if (!user2) {
      return res.status(404).json({ error: 'Error finding user to follow' });
    }

    // Check if the user is already following the target user
    if (user.following.includes(userIdToFollow)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    // Check if the target user is already followed by the user
    if (user2.followers.includes(id)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    user.following.push(userIdToFollow);
    await user.save();

    user2.followers.push(id);
    await user2.save();

    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      pfp: user.pfp,
      role: user.role,
      followers: user.followers,
      following: user.following,
      reviews: user.reviews
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Unfollow user
const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { userIdToUnfollow } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user2 = await User.findById(userIdToUnfollow);
    if (!user2) {
      return res.status(404).json({ error: 'Error finding user to unfollow' });
    }

    // Check if the user is not following the target user
    if (!user.following.includes(userIdToUnfollow)) {
      return res.status(400).json({ error: 'Not following this user' });
    }

    // Check if the target user is not followed by the user
    if (!user2.followers.includes(id)) {
      return res.status(400).json({ error: 'Not following this user' });
    }

    const index = user.following.indexOf(userIdToUnfollow);
    const index2 = user2.followers.indexOf(id);

    user.following.splice(index);
    await user.save();

    user2.followers.splice(index2);
    await user2.save();

    res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      pfp: user.pfp,
      role: user.role,
      followers: user.followers,
      following: user.following,
      reviews: user.reviews
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// get user followers
const getUserFollowers = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followers = await User.find({ _id: { $in: user.followers } });

    if (!followers || followers.length === 0) {
      return res.status(404).json({ msg: "No followers found for this user" });
    }

    res.status(200).json(followers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// get user following

const getUserFollowing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = await User.find({ _id: { $in: user.following } });

    if (!following || following.length === 0) {
      return res.status(404).json({ msg: "No following found for this user" });
    }

    res.status(200).json(following);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Export functions to be used in other modules
module.exports = { getUsers, getTopReviewers, getUserByID, userLogin, userRegister, updateUser, deleteUser, followUser, unfollowUser, getUserFollowers, getUserFollowing };