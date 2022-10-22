const express = require("express");
const router = express.Router();
const saveCodeController = require("../controllers/saveCodeController");

router.get("/", saveCodeController);

module.exports = router;
