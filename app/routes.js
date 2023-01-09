const router = require("express").Router();
const generalRoute = require("../routes/generalRoute");
const authRoute = require("../routes/authentication");
const userRoute = require("../routes/users");
const authenticate = require("../middleware/authenticate");

router.use(generalRoute);
router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);

module.exports = router;
