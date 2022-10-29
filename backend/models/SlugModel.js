const mongoose = require("mongoose");

const slugShareCodeModel = mongoose.Schema({
  slug: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: "6 days",
    },
  },
});

module.exports = mongoose.model("Slug", slugShareCodeModel);
