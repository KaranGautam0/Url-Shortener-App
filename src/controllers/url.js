const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();

    await URL.create({
      shortID: shortID,
      redirectURL: url,
      visitHistory: [],
    });

    res.status(201).json({ message: "URL Saved.", shortID: shortID });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function Analytics(req, res) {
  const shortID = req.params.shortid;
  const result = await URL.findOne({ shortID });

  return res.json({
    shortID: result.shortID,
    LongURL: result.redirectURL,
    totalChicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// shortid find and redirect that url
async function shortIDFind(req, res) {
  const shortID = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry, shortID);
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  Analytics,
  shortIDFind,
};