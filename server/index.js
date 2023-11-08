const express = require("express");
const users = require("./views/user_view"); // Include API routes for users 

const app = express();

// Routes for user API
app.use("/api/users", users);

app.get("/", (req, res) => {
    res.send("Welcome to Gamerank API!");
});

app.listen(4000, () => {
    console.log("Running back-end server on port 4000...");
});

// NOTE: Run the back-end by changing the directory to gamerank/server/ and typing the command `npm start`.
// (Will be mentioned in README.md later.)