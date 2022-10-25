const SaveCodeModel = require("../models/SaveCodeModel");

const saveCodeController = async (req, res) => {
  const { name, inputCode, language, userId } = req.body;

  if (!name || !inputCode || !userId) {
    res.status(400).json({ message: "Please enter all fields to save code !" });
  }

  try {
    // save code to database

    const newSaveCode = SaveCodeModel.create({
      name,
      inputCode,
      language,
      userId,
    });

    if (newSaveCode) {
      return res.status(201).json({
        message: "Successfully Code Saved to database !",
      });
    } else {
      return res
        .status(400)
        .json({ message: "Error saving code. Please try again later !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const findSaveCodeAll = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "User Id required !" });
  }

  try {
    const getAllSaveCodes = await SaveCodeModel.find({ userId: userId });
    if (getAllSaveCodes) {
      return res.status(200).json(getAllSaveCodes);
    } else {
      return res.status(400).json({
        message: "Error Finding saving code. Please try again later !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const findSaveCodeById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: "code Id required !" });
  }

  try {
    const getSaveCodeById = await SaveCodeModel.findById(id);

    if (getSaveCodeById) {
      return res.status(200).json({ getSaveCodeById });
    } else {
      return res.status(400).json({
        message: "Error Finding saving code. Please check code id !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteSaveCodeById = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "code Id required !" });
  }

  try {
    const deleteSaveCode = await SaveCodeModel.findOneAndDelete(id);

    if (deleteSaveCode) {
      return res.status(200).json({ message: "Successfully Deleted the code" });
    } else {
      return res.status(400).json({
        message: "Error deleting code. Please check code id !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteSaveCodeAll = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: " user id required !" });
  }

  try {
    const deleteSaveCode = await SaveCodeModel.deleteMany({ userId: userId });

    if (deleteSaveCode) {
      return res
        .status(200)
        .json({ message: "Successfully Deleted all codes" });
    } else {
      return res.status(400).json({
        message: "Error Finding saving code. Please check code user id !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const editSaveCodeFileName = async (req, res) => {
  const { id } = req.query;
  const { newFileName } = req.body;

  try {
    const file = await SaveCodeModel.findById(id);

    if (file) {
      file["name"] = newFileName;

      file.save();
      res.status(200).json({ message: "File name updated !" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveCodeController,
  findSaveCodeAll,
  findSaveCodeById,
  deleteSaveCodeById,
  deleteSaveCodeAll,
  editSaveCodeFileName,
};
