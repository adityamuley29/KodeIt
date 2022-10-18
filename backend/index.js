const express = require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCPP");
const { executePython } = require("./executePython");


const app = express();

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ALL app routes

app.get("/", (req, res) => {
  return res.json({
    Hello: "World",
  });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res
      .status(400)
      .json({ success: "false", error: "Body of code should not be empty!!" });
  }

  try {
    // we need to generate cpp file with content from the file
    const filePath = await generateFile(language, code);

    // we need to run the file and send the response

    if(language === 'cpp'){
      const output = await executeCpp(filePath);
      return res.json({ filePath, output });
    }else{
      const output = await executePython(filePath);
      return res.json({ filePath, output });
    }
    
    

    
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Server runnning on PORT 5000...");
});
