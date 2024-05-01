const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pfp: {type: String},
    role: {type: String, required: true},
    followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Types.ObjectId, ref: "User"}],
    reviews: {type: Number, default: 0}
});

module.exports = mongoose.model("User", userSchema);