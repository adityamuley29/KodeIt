const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields !" });
  }
  try {
    // check if user exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already Exists. Please Sign in ! ",
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user in database
    const createUser = User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (createUser) {
      return res.status(201).json({
        message: "User registered Successfully!",
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        token: generateToken(createUser._id),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Error registering user. Please try again later !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all details !" });
  }
  try {
    // check user exists
    const findUser = await User.findOne({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      return res.status(200).json({
        _id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        token: generateToken(findUser._id),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Error Signin user. Please try again later !" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async (req, res) => {
  try {
    res.json({ message: "sign out user route working !!!" });
  } catch (error) {
    console.log(error);
  }
};

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id },  process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = {
  registerUser,
  signInUser,
  signOutUser,
};
