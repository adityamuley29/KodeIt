const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
  language: {
    type: String,
    require: true,
    enum: ["cpp", "py"],
  },
  filePath: {
    type: String,
    require: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt:{
    type:Date
  },
  completedAt:{
    type:Date
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"],
  },
  output: {
    type: String,
  },
});

const Job = new mongoose.model("job", JobSchema);

module.exports = Job;
