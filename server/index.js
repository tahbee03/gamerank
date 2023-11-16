require("dotenv").config(); // Connect environment variables from .env file to process.env object
const express = require("express");
const users = require("./views/user_view"); // Include API routes for users 
const mongoose = require("mongoose"); // Include Mongoose library
// const port = import.meta.env.VITE_PORT;
// const uri = import.meta.env.VITE_MONGO_URI;

const app = express();

// Middleware required to parse request body
app.use(express.json());

// Routes for user API
app.use("/api/users", users);

app.get("/", (req, res) => {
    res.send("Welcome to Gamerank API!");
});

// app.listen(4000, () => {
//     console.log("Running back-end server on port 4000...");
// });

// Connect to database
mongoose.connect(process.env.VITE_MONGO_URI)
    .then(() => {
        console.log("Connected to database!");

        if(process.env.VITE_PORT) {
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