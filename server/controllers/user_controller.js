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

// Login functionality
const userLogin = async (req, res) => {
    // TODO: Revise with legit authentication
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        
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

// Export functions to be used in other modules
module.exports = {getUsers, getUserByID, userLogin, userRegister, updateUser, deleteUser};