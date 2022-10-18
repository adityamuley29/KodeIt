const { exec, execFile } = require("child_process");
const fs = require("fs");

const executePython = (filepath) => {
  return new Promise((resolve, reject) => {
    execFile(
      "python",
      [`${filepath}`],
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
    
    
  });
};

module.exports = {
  executePython,
};
