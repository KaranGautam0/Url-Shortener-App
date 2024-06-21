const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoDB_Url;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to the mongodb server...");
});

db.on("error", (error) => {
  console.log("mongodb server connection error", error);
});

db.on("disconnected", () => {
  console.log("mongodb disconnected");
});

module.exports = db;
