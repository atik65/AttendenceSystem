const healthController = require("../controllers/healthController");
const router = require("express").Router();

router.use(require("../routes/generalRoute"));
router.use("/auth", require("../routes/authentication"));
router.get("/health", healthController);

module.exports = router;
