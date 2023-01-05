const router = require("express").Router();

router.get("/", (_req, res, _next) => {
  res.status(200).json({
    message: "Welcome to root route!",
  });
});

router.get("/about", (_req, res, _next) => {
  res.status(200).json({
    message: "Welcome to about route!",
  });
});

module.exports = router;
