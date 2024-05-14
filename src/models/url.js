const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const urlSchma = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Object } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchma);
module.exports = URL;
