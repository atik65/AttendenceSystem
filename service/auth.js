const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateError = require("../errors/customError");
const { findUserByProperty, createNewUser } = require("./user");

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);

  if (user) {
    throw generateError(400, "User already exist.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  password = hash;

  user = await createNewUser({
    name,
    email,
    password,
    roles: ["STUDENT"],
    accountStatus: "PENDING",
  });

  return user;
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw generateError(400, "Invalid Credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw generateError(400, "Invalid credentials.");
  }
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  const token = jwt.sign(payload, "secret-key", { expiresIn: "2h" });
  return token;
};

module.exports = {
  registerService,
  loginService,
};
