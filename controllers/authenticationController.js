const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateError = require("../errors/customError");

const registration = async (req, res, next) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = generateError(400, "Invalid Data.");
    return next(error);
  }

  let user = await User.findOne({
    email,
  });

  if (user) {
    const error = generateError(400, "User already exist.");
    return next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  password = hash;

  user = new User({
    name,
    email,
    password,
    roles: ["STUDENT"],
    accountStatus: "PENDING",
  });

  await user.save();

  res.status(201).json({
    message: "Registration successful",
    user,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(generateError(400, "Invalid Credentials."));
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(generateError(400, "Invalid Credentials."));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(generateError(400, "Invalid credentials."));
  }

  //   TODO: generate token

  delete user._doc.password;

  res.status(200).json({
    message: "Login successful",
    user,
  });
};

module.exports = {
  registration,
  login,
};
