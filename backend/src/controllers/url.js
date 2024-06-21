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
  try {
    const { shortid: shortID } = req.params;
    if (!shortID) return res.status(400).json({ error: "shortID id required" });

    const result = await URL.findOne({ shortID });
    if (!result) return res.status(404).json({ error: "shortID not found!" });

    return res.json({
      shortID: result.shortID,
      LongURL: result.redirectURL,
      totalChicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// shortid find and redirect that url
async function shortIDFind(req, res) {
  try {
    const { shortid: shortID } = req.params;
    if (!shortID) return res.status(400).json({ error: "shortID id required" });

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

    if (!entry) return res.status(404).json({ error: "ShortID not found" });

    console.log(`Entry found: ${entry}, shortID:${shortID}`);
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(`Error during shortIDFind : ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  Analytics,
  shortIDFind,
};
