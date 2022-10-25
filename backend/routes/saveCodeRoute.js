const express = require("express");
const router = express.Router();
const {
  saveCodeController,
  findSaveCodeAll,
  findSaveCodeById,
  deleteSaveCodeById,
  deleteSaveCodeAll,
  editSaveCodeFileName,
} = require("../controllers/saveCodeController");

router.post("/", saveCodeController);
router.post("/find/all", findSaveCodeAll);
router.get("/find/", findSaveCodeById);
router.delete("/delete/", deleteSaveCodeById);
router.delete("/delete/all", deleteSaveCodeAll);
router.put("/edit-file-name/", editSaveCodeFileName);

module.exports = router;
