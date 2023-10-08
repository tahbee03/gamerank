const express = require("express");
const app = express();

app.listen(4000, () => {
    console.log("Running back-end server on port 4000...");
});

// NOTE: Run the back-end by changing the directory to gamerank/server/ and typing the command `npm start`.
// (Will be moved to README.md later.)