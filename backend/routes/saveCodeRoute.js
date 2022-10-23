const express = require("express");
const router = express.Router();
const {
  saveCodeController,
  findSaveCodeAll,
  findSaveCodeById,
  deleteSaveCodeById,
  deleteSaveCodeAll,
} = require("../controllers/saveCodeController");

router.post("/", saveCodeController);
router.get("/find/all", findSaveCodeAll);
router.get("/find/", findSaveCodeById);
router.delete("/delete/", deleteSaveCodeById);
router.delete("/delete/all", deleteSaveCodeAll);

module.exports = router;
