const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(`mongodb://localhost:27017/kodeIt`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e.message));
};

module.exports = connectDB;
