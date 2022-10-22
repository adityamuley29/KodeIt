const express = require("express");
const router = express.Router();
const {
  registerUser,
  signInUser,
  signOutUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/signin", signInUser);
router.post("/signout", signOutUser);

module.exports = router;
