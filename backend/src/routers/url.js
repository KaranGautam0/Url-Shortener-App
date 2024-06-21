const express = require("express");

const {
  handleGenerateNewShortURL,
  Analytics,
  shortIDFind,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortid", Analytics);
router.get("/:shortid", shortIDFind);

module.exports = router;
