const userController = require("../controllers/users");

const router = require("express").Router();

/**
 * get users by userId or email
 * @route api/v1/users/id
 * @method GET
 * @visibility private
 */

router.get("/:userId", userController.getUserById);

/**
 * update users by userId or email
 * @route api/v1/users/id
 * @method PATCH
 * @visibility private
 */

router.patch("/:userId", userController.patchUserById);

/**
 * update users by userId or email
 * @route api/v1/users/id
 * @method PUT
 * @visibility private
 */

router.put("/:userId", userController.putUserById);

/**
 * delete users by userId or email
 * @route api/v1/users/id
 * @method DELETE
 * @visibility private
 */

router.delete("/:userId", userController.deleteUserById);

/**
 * get all users include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route api/v1/users
 * @method GET
 * @visibility private
 */

router.get("/", userController.getUsers);

/**
 * create new user
 * @route api/v1/users
 * @method POST
 * @visibility private
 */
router.post("/", userController.postUser);

module.exports = router;
