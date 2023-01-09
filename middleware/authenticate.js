const jwt = require("jsonwebtoken");
const error = require("../errors/customError");
const User = require("../models/User");

const authenticate = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(error(401, "Unauthorized"));
    }

    let decoded = jwt.verify(token.split(" ")[1], "secret-key");

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(error(401, "Unauthorized"));
    }
    req.user = user;

    next();
  } catch (e) {
    next(error(401, "Invalid token"));
  }
};

module.exports = authenticate;
