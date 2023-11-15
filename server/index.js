require("dotenv").config(); // Connect environment variables from .env file to process.env object
const express = require("express");
const users = require("./views/user_view"); // Include API routes for users 
const mongoose = require("mongoose"); // Include Mongoose library

const app = express();

// Routes for user API
app.use("/api/users", users);

app.get("/", (req, res) => {
    res.send("Welcome to Gamerank API!");
});

// app.listen(4000, () => {
//     console.log("Running back-end server on port 4000...");
// });

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database!");

        if(process.env.PORT) {
            // Listen for requests (after connecting to database)
            app.listen(process.env.PORT, () => {
                console.log(`Running back-end server on port ${process.env.PORT}...`);
            });
        }
    })
    .catch((err) => {
        // Print errors (if any)
        console.log(err);
    });