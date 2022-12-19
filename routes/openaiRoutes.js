const express = require("express");
const {
  generateImage,
  generateText,
} = require("../controllers/openaiController");
const router = express.Router();

// add a post request to /generateImage route
router.post("/generateImage", generateImage);

router.get("/generateText", generateText);

module.exports = router;
