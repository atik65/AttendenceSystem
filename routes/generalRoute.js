const healthController = require("../controllers/health");
const authenticate = require("../middleware/authenticate");

const router = require("express").Router();

router.get("/", authenticate, (_req, res, _next) => {
  res.status(200).json({
    message: "Welcome to root route!",
  });
});

router.get("/health", healthController);

module.exports = router;
