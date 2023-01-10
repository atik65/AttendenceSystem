const error = require("../errors/customError");
const { registerService } = require("../service/auth");
const { findUsers, findUserByProperty } = require("../service/user");

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter , sort, pagination, select
   */

  try {
    const users = await findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) {
      //   return next(error(404, "User not found."));
      throw error(404, "User not found.");
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const putUserById = (req, res, next) => {};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;

  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error(404, "User not found");
    }

    user.name = name ? name : user.name;
    user.roles = roles ? roles : user.roles;
    user.accountStatus = accountStatus ? accountStatus : user.accountStatus;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully.",
      user,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      throw error(404, "No user found.");
    }
    await user.remove();
    return res.status(203).json({ message: "User deleted successfully." });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  putUserById,
  patchUserById,
  deleteUserById,
};
