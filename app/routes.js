const router = require("express").Router();

router.use(require("../routes/generalRoute"));

router.get("/health", (_req, res, _next) => {
  res.status(200).json({
    message: "Server health is ok!",
  });
});

module.exports = router;
