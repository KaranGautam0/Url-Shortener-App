const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to short url generator api" });
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
