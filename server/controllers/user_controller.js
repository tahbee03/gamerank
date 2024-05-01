const User = require("../models/user_model");
const mongoose = require("mongoose");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({createdAt: -1});

        if(users.length == 0) res.status(404).json({msg: "There are no users!"});
        else res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error});
    }
};

// Get specific user
const getUserByID = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "No such user!"});

    try {
        const user = await User.findById(id);

        if(!user) res.status(404).json({error: "No such user!"});
        else res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error});
    }
};

const calculateTopReviewers = async () => {
  try {
    const topReviewers = await User.aggregate([
      { 
        $match: { 
          reviews: { $type: 'number', $gte: 1 }
        } 
      },
      {
        $project: {
          username: 1,
          reviewCount: '$reviews'
        }
      },
      { $sort: { reviewCount: -1 } }, 
      { $limit: 10 } 
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
    // TODO: Revise with legit authentication
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        
        if(!user) res.status(404).json({error: "No such user!"});
        else if(password != user.password) res.status(400).json({error: "Incorrect password!"});
        else res.status(200).json({username: user.username, email: user.email, id: user._id});
    } catch(error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
};

// Sign up functionality
const userRegister = async (req, res) => {
    // TODO: Revise with legit authentication
    const {username, email, password} = req.body;

    try {
        const match = await User.findOne({email});
        if (match) res.status(400).json({error: "Email already in use!"});
        else {
            const user = await User.create({
                username,
                email,
                password,
                pfp: "",
                role: "gamer"
            });

            res.status(200).json({username: user.username, email: user.email, id: user._id});
        }
    } catch(error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
};

// Update specific user
const updateUser = async (req, res) => {
    // res.send("update user");

    // TODO: Implement
};

// Delete specific user
const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "No such user!"});

    try {
        const user = await User.findOneAndDelete({_id: id});

        if(!user) res.status(404).json({error: "No such user!"});
        else res.status(200).json({msg: "User successfully deleted!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error});
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
  
      // Check if the user is already following the target user
      if (user.following.includes(userIdToFollow)) {
        return res.status(400).json({ error: 'Already following this user' });
      }
  
      user.following.push(userIdToFollow);
      await user.save();
  
      res.json(user);
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
  
      // Check if the user is not following the target user
      if (!user.following.includes(userIdToUnfollow)) {
        return res.status(400).json({ error: 'Not following this user' });
      }
  
      user.following = user.following.filter(userId => userId !== userIdToUnfollow);
      await user.save();
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

// Export functions to be used in other modules
module.exports = {getUsers, getTopReviewers, getUserByID, userLogin, userRegister, updateUser, deleteUser, followUser, unfollowUser};