require("dotenv").config(); // Connect environment variables from .env file to process.env object
const express = require("express");
const users = require("./views/user_view"); // Include routes for users 
const rankings = require("./views/ranking_view"); // Include routes for rankings
const mongoose = require("mongoose"); // Include Mongoose library
const cors = require("cors");

const app = express();

// Allows endpoints to be reached by front-end
app.use(cors());

// Middleware required to parse request body
app.use(express.json());

// Routes for user API
app.use("/api/users", users);

// Routes for ranking API
app.use("/api/rankings", rankings);

app.get("/", (req, res) => {
    res.send("Welcome to Gamerank API!");
});

// Connect to database
mongoose.connect(process.env.VITE_MONGO_URI)
    .then(() => {
        console.log("Connected to database!");

        if (process.env.VITE_PORT) {
            // Listen for requests (after connecting to database)
            app.listen(process.env.VITE_PORT, () => {
                console.log(`Running back-end server on port ${process.env.VITE_PORT}...`);
            });
        }
    })
    .catch((err) => {
        // Print errors (if any)
        console.log(err);
    });