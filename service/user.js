const error = require("../errors/customError");
const User = require("../models/User");

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key == "_id") {
    return User.findById(value);
  }

  return User.findOne({
    [key]: value,
  });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });

  return user.save();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error(400, "Email already in use.");
  }

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  findUsers,
  findUserByProperty,
  createNewUser,
  updateUser,
};
