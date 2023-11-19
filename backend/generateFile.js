const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const generateFile = async (format, content) => {
  const dirCodes = await path.join(process.cwd(), "codes");

  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }

  const jobId = uuid();
  const fileName = `${jobId}.${format}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFileSync(filePath, content);

  return filePath;
};

module.exports = {
  generateFile,
};
