function isValidURL(req, res, next) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });

  // Checking URL Validation
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const result = urlPattern.test(url);
  if (!result) return res.status(400).json({ error: "invalid URL" });

  next();
}

module.exports = {
  isValidURL,
};
