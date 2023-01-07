const {
  registration,
  login,
} = require("../controllers/authenticationController");

const router = require("express").Router();

router.post("/reg", registration);
router.post("/login", login);

router.get("/reg", (req, res, next) => {
  res.json({
    message: "success",
  });
});

module.exports = router;
