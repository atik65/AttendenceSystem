const router = require("express").Router();
const generalRoute = require("../routes/generalRoute");
const authRoute = require("../routes/authentication");

router.use(generalRoute);
router.use("/api/v1/auth", authRoute);

module.exports = router;
