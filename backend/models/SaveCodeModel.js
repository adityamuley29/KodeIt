const mongoose = require("mongoose");

const SaveCodeModel = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  inputCode: { type: String, require: true },
  language: {
    type: String,
    require: true,
    enum: ["c", "cpp", "py","js"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Save-Code", SaveCodeModel);
