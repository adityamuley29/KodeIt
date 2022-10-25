const { generateFile } = require("../generateFile");
const { executeCpp } = require("../executeCPP");
const { executePython } = require("../executePython");
const { executeC } = require("../executeC");
const Job = require("../models/Job");
const { executeJavascript } = require("../executeJavascript");

const runController = async (req, res) => {
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
    } else if (language === "c") {
      output = await executeC(filePath);
    } else if (language === "py") {
      output = await executePython(filePath);
    } else {
      output = await executeJavascript(filePath);
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
};

module.exports = runController;
