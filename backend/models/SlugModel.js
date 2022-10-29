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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Slug", slugShareCodeModel);
