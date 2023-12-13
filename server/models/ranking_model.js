const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    picUrl: {type: String, required: true},
    rank: {type: Number, required: true},
    desc: {type: String, required: true},
    spoiler: {type: Boolean, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Ranking", rankingSchema);