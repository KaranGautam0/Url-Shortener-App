const express = require("express");
const { handleGenerateNewShortURL, Analytics } = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortid", Analytics);

module.exports = router;
