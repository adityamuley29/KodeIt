const express = require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCPP");
const { executePython } = require("./executePython");
const cors = require("cors");
const connectDB = require("./db/db");
const Job = require("./models/Job");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
connectDB();

// ALL app routes

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  console.log("Status requested :", jobId);
  if (jobId === undefined) {
    return res.status(400).json({ success: false, error: "Missing id params" });
  }

  try {
    const job = await Job.findById(jobId);

    if (job === undefined) {
      return res.status(404).json({ success: false, error: "invalid job id" });
    }

    return res.status(200).json({success:true,job});
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: JSON.stringify(error) });
  }
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Body of code should not be empty!!" });
  }
  let job;

  try {
    // we need to generate cpp file with content from the file
    const filePath = await generateFile(language, code);

    job = await new Job({ language, filePath }).save();
    const jobId = job["_id"];
    res.status(201).json({ success: true, jobId });

    console.log(job);

    // we need to run the file and send the response

    let output;
    job["startedAt"] = new Date();
    if (language === "cpp") {
      output = await executeCpp(filePath);
    } else {
      output = await executePython(filePath);
    }

    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;

    await job.save();

    console.log(job);
    // return res.json({ filePath, output });
  } catch (error) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(error);
    await job.save();

    console.log(job);
    // res.status(500).json({ error });
  }
});

app.listen(5000, () => {
  console.log("Server runnning on PORT 5000...");
});
