const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
