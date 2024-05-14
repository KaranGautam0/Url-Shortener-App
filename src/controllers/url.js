const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortID: shortID,
    redirectURL: url,
    visitHistory: [],
  });

  res.status(200).json({ message: "URL Saved." });
}

module.exports = {
  handleGenerateNewShortURL,
};
