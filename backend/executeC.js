const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `gcc ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
        // Below Remove() is to delete the file after successull file execution
        fsExtra.remove(filepath, (error) => {
          error !== null ?? console.log(`Remove File : `, error);
        });
        // Below Remove() is to delete the file after successull file execution
        fsExtra.remove(outPath, (error) => {
          error !== null ?? console.log(`Remove File : `, error);
        });
      }
    );
  });
};

module.exports = {
  executeC,
};
