const { exec, execFile } = require("child_process");
const fsExtra = require("fs-extra");
const path = require("path")


const executePython = (filepath) => {
  return new Promise((resolve, reject) => {
    execFile("python", [`${filepath}`], (error, stdout, stderr) => {
      error && reject(`${path.basename(stderr)}` );
      stderr && reject(stderr);
      resolve(stdout);

      // Below Remove() is to delete the file after successull file execution
      fsExtra.remove(filepath, (error) => {
        error !== null ?? console.log(`Remove File : `, error);
      });
    });
  });
};

module.exports = {
  executePython,
};
