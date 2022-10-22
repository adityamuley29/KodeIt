const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const app = express();
require("dotenv").config();
const protect = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
connectDB();

// ---------ALL app routes-----------------

// below route is for getting the status of job
app.use("/api/status", require("./routes/statusRoute"));

// below route is for compile & run the code
app.use("/api/run", require("./routes/runRoute"));

// below route is for user auth
app.use("/api/users", require("./routes/userRoutes"));

// below route is for save code in database

app.use("/api/save-code", protect, require("./routes/saveCodeRoute"));

// app listening on port 5000
app.listen(process.env.PORT, () => {
  console.log("Server runnning on PORT 5000...");
});
