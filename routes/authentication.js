const {
  registrationController,
  loginController,
} = require("../controllers/auth");

const router = require("express").Router();

router.post("/reg", registrationController);
router.post("/login", loginController);

module.exports = router;
