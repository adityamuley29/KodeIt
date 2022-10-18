const { exec, execFile } = require("child_process");
const fs = require("fs");

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    execFile(
      "javac",
      [`${filepath}`,`java `],
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
    
    
  });
};

module.exports = {
  executeJava,
};
