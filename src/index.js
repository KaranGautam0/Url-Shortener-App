const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./db/db");

const app = express();
const PORT = process.env.PORT || 3000;

// All data formate
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors policy
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to short url generator api" });
});

// importing router here
const routerURL = require("./routers/url");

// use this routers
app.use("/url", routerURL);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
