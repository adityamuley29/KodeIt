const { exec, spawn, execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { cpp } = require("compile-run");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  const executableFile = path.join(jobId);

  return new Promise((resolve, reject) => {
    // working fine
    execFile(
      "g++",
      [`${filepath}`, `-o`, `${outPath}`],
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );

    // exe file not dynamiclly executing
    exec(
      `.\\8ec969e1-9df5-4c3d-bc3f-d9c3e786d096`,
      { cwd: outputPath },
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({stderr});
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
