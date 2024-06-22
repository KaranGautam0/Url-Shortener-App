const express = require("express");
const { isValidURL } = require("../middlewares/url");

const {
  handleGenerateNewShortURL,
  Analytics,
  shortIDFind,
} = require("../controllers/url");
const router = express.Router();

router.post("/", isValidURL, handleGenerateNewShortURL);
router.get("/analytics/:shortid", Analytics);
router.get("/:shortid", shortIDFind);

module.exports = router;
