const express = require("express");
const {
  generateSlug,
  findSlug,
} = require("../controllers/shareCodeController");
const router = express.Router();

router.post("/slug-generate", generateSlug);
router.get("/slug-find", findSlug);

module.exports = router;
