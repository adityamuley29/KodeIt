const Job = require("../models/Job");

const statusController = async (req, res) => {
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

    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: JSON.stringify(error) });
  }
};

module.exports = statusController;
