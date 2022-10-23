const mongoose = require("mongoose");
const  SaveCodeModel  = require("./SaveCodeModel").schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name !"],
    },
    email: {
      type: String,
      require: [true, "Please add an email !"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password !"],
      min: [6, " Password should be >= 6"],
    },
    saveCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaveCodeModel" }],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
