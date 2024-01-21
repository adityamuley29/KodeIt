const { exec, execFile } = require("child_process");
const fsExtra = require("fs-extra");
const path = require("path");

const executeJavascript = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  return new Promise((resolve, reject) => {
    exec(`node ./codes/"${jobId}".js`, (error, stdout, stderr) => {
      error && reject(`${path.basename(stderr)}`);
      stderr && reject(stderr);
      resolve(stdout);

      // Below Remove() is to delete the file after successull file execution
      // fsExtra.remove(filepath, (error) => {
      //   error !== null ?? console.log(`Remove File : `, error);
      // });
    });
  });
};

module.exports = {
  executeJavascript,
};
