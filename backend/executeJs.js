const { exec } = require("child_process");
// require('./sample')

exec(`node sample.js`, (error, stdout, stderr) => {
//   console.log(error);
  console.log(stdout);
//   console.log(stderr);
});
