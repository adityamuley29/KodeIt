const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

router.get("/", statusController);

module.exports = router;
