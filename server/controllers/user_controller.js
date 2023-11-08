// TODO: Include model file when created

// Get all users
const getUsers = async (req, res) => {
    res.send("get all users");
};

// Get specific user
const getUserByID = async (req, res) => {
    res.send("get specific user");
};

/// Login functionality
const userLogin = async (req, res) => {
    res.send("user login");
};

// Sign up functionality
const userRegister = async (req, res) => {
    res.send("user register");
};

// Update specific user
const updateUser = async (req, res) => {
    res.send("update user");
};

// Delete specific user
const deleteUser = async (req, res) => {
    res.send("delete user");
};

// Export functions to be used in other modules
module.exports = {getUsers, getUserByID, userLogin, userRegister, updateUser, deleteUser};