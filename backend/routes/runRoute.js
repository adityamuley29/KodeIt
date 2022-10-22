const express = require("express");
const router = express.Router();
const runController = require("../controllers/runController");

router.post("/", runController);

module.exports = router;
