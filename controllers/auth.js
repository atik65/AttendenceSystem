const error = require("../errors/customError");
const { registerService, loginService } = require("../service/auth");

const registrationController = async (req, res, next) => {
  let { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return next(error(400, "Invalid Data."));
  }

  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next(error(400, "Invalid Credentials."));
  }

  try {
    const token = await loginService({
      email,
      password,
    });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registrationController,
  loginController,
};
