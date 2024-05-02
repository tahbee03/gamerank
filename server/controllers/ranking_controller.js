const Ranking = require("../models/ranking_model");
const User = require("../models/user_model");
const mongoose = require("mongoose");

const getRankings = async (req, res) => {
    try {
        const rankings = await Ranking.find({}).sort({ createdAt: -1 });

        if (rankings.length == 0) res.status(404).json({ msg: "There are no rankings!" });
        else res.status(200).json(rankings);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error });
    }
};

const getRankingByID = async (req, res) => {

};

const createRanking = async (req, res) => {
    console.log(req.body);

    const { title, author, picUrl, rank, desc, spoiler, gameID } = req.body;

    try {
        const ranking = await Ranking.create({
            title,
            author,
            picUrl,
            rank,
            desc,
            spoiler,
            gameID
        });

        await User.findByIdAndUpdate(author, { $inc: { reviews: 1 } });
        res.status(200).json(ranking);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }

};

const deleteRanking = async (req, res) => {

};

// Export functions to be used in other modules
module.exports = { getRankings, getRankingByID, createRanking, deleteRanking };